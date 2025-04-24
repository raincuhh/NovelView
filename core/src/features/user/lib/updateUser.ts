import { powersyncDb } from "@/shared/providers/systemProvider";
import { UserReadingPrefsMetadata, UserMetadata } from "@/features/user/types";

export async function updateUserReadingPrefs(
	userId: string,
	updatedPrefs: Partial<UserReadingPrefsMetadata>
) {
	const query = `UPDATE user_reading_prefs SET prefs = json_patch(prefs, json(?)) WHERE id = ?`;
	await powersyncDb.execute(query, [JSON.stringify(updatedPrefs), userId]);
}

export async function updateUserSettings(
	userId: string,
	updatedMetadata: Partial<UserMetadata>,
	updatedAt: string
) {
	const query = `UPDATE user_settings SET metadata = json_patch(metadata, json(?)), updated_at = ? WHERE id = ?`;
	await powersyncDb.execute(query, [JSON.stringify(updatedMetadata), updatedAt, userId]);
}
