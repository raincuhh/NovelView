import { powersyncDb } from "@/shared/providers/systemProvider";
import { getDefaultUserReadingPrefs } from "./utils";
import { ThemeType } from "@/shared/database/types";

export async function insertUserData(
	userId: string,
	avatarUrl: string,
	theme: ThemeType = "dark"
): Promise<void> {
	const defaultReadingPrefs = getDefaultUserReadingPrefs();
	const now = new Date().toISOString();

	await powersyncDb.writeTransaction(async (tx) => {
		// user profile
		const profileExists = await tx.getOptional("SELECT * FROM user_profiles WHERE user_id = ?", [userId]);

		if (!profileExists) {
			await tx.execute(
				"INSERT INTO user_profiles (user_id, avatar_url, created_at, updated_at) VALUES (?, ?, ?, ?)",
				[userId, avatarUrl, now, now]
			);
			console.log("Seeded local user profile for:", userId);
		}

		// user settings
		const settingsExists = await tx.getOptional("SELECT * FROM user_settings WHERE user_id = ?", [userId]);

		if (!settingsExists) {
			await tx.execute(
				"INSERT INTO user_settings (user_id, theme, metadata, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
				[userId, theme, "{}", now, now]
			);
			console.log("Seeded local user settings for:", userId);
		}

		// reading prefs
		const prefsExist = await tx.getOptional("SELECT * FROM user_reading_prefs WHERE user_id = ?", [userId]);

		if (!prefsExist) {
			await tx.execute("INSERT INTO user_reading_prefs (user_id, prefs) VALUES (?, ?)", [
				userId,
				JSON.stringify(defaultReadingPrefs),
			]);
			console.log("Seeded local user reading prefs for:", userId);
		}
	});
}
