import { create } from "zustand";
import { UserReadingPrefs, UserReadingPrefsMetadata } from "../types";
import { powersyncDb } from "@/shared/providers/systemProvider";
import { getDefaultUserReadingPrefs } from "../lib/utils";
import { updateUserReadingPrefs } from "../lib/updateUser";

interface UserReadingPrefsStore {
	readingPrefs: UserReadingPrefs | null;

	setReadingPrefs: (prefs: UserReadingPrefs) => void;
	updateReadingPrefs: (prefs: Partial<UserReadingPrefsMetadata>) => void;
	clearReadingPrefs: () => void;
}

export const useUserReadingPrefsStore = create<UserReadingPrefsStore>((set, get) => ({
	readingPrefs: null,

	setReadingPrefs: async (prefs) => {
		set({ readingPrefs: prefs });

		// await powersyncDb.execute(`INSERT OR REPLACE INTO user_reading_prefs (id, prefs) VALUES (?, json(?))`, [
		// 	prefs.id,
		// 	JSON.stringify(prefs.prefs),
		// ]);
		await updateUserReadingPrefs(prefs.id, prefs.prefs);
	},

	updateReadingPrefs: async (partialPrefs) => {
		const current = get().readingPrefs;
		if (!current) return;

		const updatedPrefs: UserReadingPrefs = {
			...current,
			prefs: {
				...getDefaultUserReadingPrefs(),
				...current.prefs,
				...partialPrefs,
			},
		};

		set({ readingPrefs: updatedPrefs });

		await updateUserReadingPrefs(updatedPrefs.id, partialPrefs);
	},

	clearReadingPrefs: () => set({ readingPrefs: null }),
}));
