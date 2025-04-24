import { powersyncDb } from "@/shared/providers/systemProvider";
import { useUserReadingPrefsStore } from "../stores/userReadingPrefsStore";
import { getDefaultUserReadingPrefs } from "@/features/user/lib/utils";
import { UserReadingPrefs } from "@/features/user/types";

export async function initUserReadingPrefs(userId: string) {
	const query = `SELECT * FROM user_reading_prefs WHERE id = ? LIMIT 1`;

	const res = await powersyncDb.execute(query, [userId]);
	const customPrefs = res?.rows?._array?.[0]?.prefs ?? {};

	const fullPrefs: UserReadingPrefs = {
		id: userId,
		prefs: {
			...getDefaultUserReadingPrefs(),
			...customPrefs,
		},
	};

	useUserReadingPrefsStore.getState().setReadingPrefs(fullPrefs);
}
