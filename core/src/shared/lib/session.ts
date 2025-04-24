import Database from "@tauri-apps/plugin-sql";
import { Session as SupabaseSession } from "@supabase/supabase-js";
// import { User } from "@/features/auth/types";

const db = await Database.load("sqlite:session.db");

async function saveSession(session: SupabaseSession): Promise<void> {
	const { access_token, refresh_token, user, expires_at } = session;

	const userId = user.id;
	const userEmail = user.email ?? null;
	const userCreatedAt = user.created_at ?? "";

	await db.execute(
		`INSERT OR REPLACE INTO session (
		  id, access_token, refresh_token, user_id, expires_at, user_email, user_created_at
		) VALUES (
		  'singleton', $1, $2, $3, $4, $5, $6
		)`,
		[access_token, refresh_token, userId, expires_at, userEmail, userCreatedAt]
	);
}

async function clearLocalSession(): Promise<void> {
	await db.execute("DELETE FROM sessions WHERE id = 'singleton'");
}

// async function getLocalSession(): Promise<SupabaseSession | null> {
// 	const rows = await db.select<{
// 		access_token: string;
// 		refresh_token: string;
// 		expires_at: number;
// 		token_type: string;
// 		user_id: string;
// 	}>("SELECT * FROM session WHERE id = 'singleton'");

// 	if (!rows || rows.length === 0) return null;

// 	const row = rows[0];

// 	const user: User = {
// 		auth: {
// 			id: row.user_id,
// 			email: row.user_email ?? undefined,
// 			created_at: row.user_created_at ?? "",
// 			app_metadata: {},
// 			user_metadata: {},
// 			aud: "authenticated",
// 		},
// 		profile: {},
// 	};

// 	return {
// 		access_token: row.access_token,
// 		refresh_token: row.refresh_token,
// 		expires_at: row.expires_at,
// 		token_type: row.token_type,
// 		user,
// 	};
// }

export { clearLocalSession, saveSession };
