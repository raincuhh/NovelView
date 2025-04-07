import {
	AbstractPowerSyncDatabase,
	BaseObserver,
	CrudEntry,
	PowerSyncBackendConnector,
	UpdateType,
} from "@powersync/web";

import { Session, SupabaseClient, createClient } from "@supabase/supabase-js";
import { env } from "./env";

export type SupabaseConfig = {
	supabaseUrl: string;
	supabaseAnonKey: string;
	powersyncUrl: string;
};

/// Postgres Response codes that we cannot recover from by retrying.
const FATAL_RESPONSE_CODES = [
	// Class 22 — Data Exception
	// Examples include data type mismatch.
	new RegExp("^22...$"),
	// Class 23 — Integrity Constraint Violation.
	// Examples include NOT NULL, FOREIGN KEY and UNIQUE violations.
	new RegExp("^23...$"),
	// INSUFFICIENT PRIVILEGE - typically a row-level security violation
	new RegExp("^42501$"),
];

export type SupabaseConnectorListener = {
	initialized: () => void;
	sessionStarted: (session: Session) => void;
};

export class SupabaseConnector
	extends BaseObserver<SupabaseConnectorListener>
	implements PowerSyncBackendConnector
{
	private readonly _client: SupabaseClient;
	private readonly _config: SupabaseConfig;
	private _ready: boolean = false;
	private _currentSession: Session | null;

	constructor() {
		super();
		this._config = {
			supabaseUrl: env.SUPABASE_URL,
			powersyncUrl: env.POWERSYNC_URL,
			supabaseAnonKey: env.SUPABASE_ANON_KEY,
		};

		this._client = createClient(this._config.supabaseUrl, this._config.supabaseAnonKey, {
			auth: {
				persistSession: true,
			},
		});
		this._currentSession = null;
		this._ready = false;
	}

	async init() {
		if (this._ready) return;

		const sessionResponse = await this._client.auth.getSession();
		this.updateSession(sessionResponse.data.session);

		this._ready = true;
		this.iterateListeners((cb) => cb.initialized?.());
	}

	async login(email: string, password: string) {
		const {
			data: { session },
			error,
		} = await this._client.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) throw error;

		this.updateSession(session);
	}

	async signOut() {
		await this._client.auth.signOut();
		this._currentSession = null;
	}

	get currentSession(): Session | null {
		return this._currentSession;
	}

	async getSession(): Promise<Session | null> {
		if (!this._ready) await this.init();
		return this._currentSession;
	}

	public async fetchCredentials() {
		const {
			data: { session },
			error,
		} = await this._client.auth.getSession();

		if (!session || error) throw new Error(`Could not fetch Supabase credentials: ${error}`);

		console.debug("session expires at", session.expires_at);

		return {
			endpoint: this._config.powersyncUrl,
			token: session.access_token ?? "",
			expiresAt: session.expires_at ? new Date(session.expires_at * 1000) : undefined,
		};
	}

	public async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
		const transaction = await database.getNextCrudTransaction();

		if (!transaction) {
			return;
		}

		let lastOp: CrudEntry | null = null;
		try {
			// Note: If transactional consistency is important, use database functions
			// or edge functions to process the entire transaction in a single call.
			for (const op of transaction.crud) {
				lastOp = op;
				const table = this._client.from(op.table);
				let result: any;
				switch (op.op) {
					case UpdateType.PUT:
						const record = { ...op.opData, id: op.id };
						result = await table.upsert(record);
						break;
					case UpdateType.PATCH:
						result = await table.update(op.opData).eq("id", op.id);
						break;
					case UpdateType.DELETE:
						result = await table.delete().eq("id", op.id);
						break;
				}

				if (result.error) {
					console.error(result.error);
					result.error.message = `Could not update Supabase. Received error: ${result.error.message}`;
					throw result.error;
				}
			}

			await transaction.complete();
		} catch (ex: any) {
			console.debug(ex);
			if (typeof ex.code == "string" && FATAL_RESPONSE_CODES.some((regex) => regex.test(ex.code))) {
				/**
				 * Instead of blocking the queue with these errors,
				 * discard the (rest of the) transaction.
				 *
				 * Note that these errors typically indicate a bug in the application.
				 * If protecting against data loss is important, save the failing records
				 * elsewhere instead of discarding, and/or notify the user.
				 */
				console.error("Data upload error - discarding:", lastOp, ex);
				await transaction.complete();
			} else {
				// Error may be retryable - e.g. network error or temporary server error.
				// Throwing an error here causes this call to be retried after a delay.
				throw ex;
			}
		}
	}

	private updateSession(session: Session | null) {
		this._currentSession = session;
		if (!session) {
			return;
		}
		this.iterateListeners((cb) => cb.sessionStarted?.(session));
	}
}
