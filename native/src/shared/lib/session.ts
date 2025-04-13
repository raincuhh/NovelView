import Database from "@tauri-apps/plugin-sql";
import { Session } from "@supabase/supabase-js";

const db = await Database.load("sqlite:session.db");

type LocalSession = {
	access_token: string;
	refresh_token: string;
	expires_at: string;
	user_id: string;
	user_email: string | null;
};

await db.execute(`
   CREATE TABLE IF NOT EXISTS sessions (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     access_token TEXT NOT NULL,
     refresh_token TEXT NOT NULL,
     expires_at INTEGER NOT NULL,
     user_id TEXT NOT NULL,
     user_email TEXT
   )
 `);

async function storeLocalSession(session: Session): Promise<void> {
	console.log("storing session: ", session);
	await db.execute(
		"INSERT INTO sessions (access_token, refresh_token, expires_at, user_id, user_email) VALUES ($1, $2, $3, $4, $5)",
		[
			session.access_token,
			session.refresh_token,
			session.expires_at,
			session.user.id,
			session.user.email || null,
		]
	);
}

async function getLocalSession(): Promise<unknown | null> {
	const result = await db.select("SELECT * FROM sessions LIMIT 1", []);

	// const rows = result as {
	// 	rows: {
	// 		access_token: string;
	// 		refresh_token: string;
	// 		expires_at: number;
	// 		user_id: string;
	// 		user_email?: string;
	// 	}[];
	// };

	// if (result) {
	// 	const row = result[0];

	// 	const user: User = {
	// 		id: row.user_id,
	// 		email: row.user_email || undefined,
	// 		app_metadata: {},
	// 		user_metadata: {},
	// 		aud: "",
	// 		created_at: new Date().toISOString(),
	// 		confirmed_at: undefined,
	// 		last_sign_in_at: undefined,
	// 		role: undefined,
	// 		updated_at: undefined,
	// 		is_anonymous: undefined,
	// 		is_sso_user: undefined,
	// 		identities: [],
	// 		factors: [],
	// 	};

	// 	return {
	// 		access_token: row.access_token,
	// 		refresh_token: row.refresh_token,
	// 		expires_at: row.expires_at,
	// 		user,
	// 		token_type: "bearer",
	// 		expires_in: row.expires_at - Math.floor(Date.now() / 1000),
	// 	};
	// }

	return result;
}

async function clearLocalSession(): Promise<void> {
	await db.execute("DELETE FROM sessions", []);
}

export { storeLocalSession, getLocalSession, clearLocalSession };
