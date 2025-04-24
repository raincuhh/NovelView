import { create } from "zustand";
import { UserSettings, UserMetadata } from "../types";
import { updateUserSettings } from "../lib/updateUser";

interface UserSettingsStore {
	settings: UserSettings | null;

	setSettings: (settings: UserSettings) => void;
	updateMetadata: (metadata: Partial<UserMetadata>) => void;
	clearSettings: () => void;
}

export const useUserSettingsStore = create<UserSettingsStore>((set, get) => ({
	settings: null,

	setSettings: (settings) => set({ settings }),

	updateMetadata: async (metadata) => {
		const state = get();
		const current = state.settings;
		if (!current) return;

		const updated = {
			...current,
			metadata: {
				...current.metadata,
				...metadata,
			},
			updatedAt: new Date().toISOString(),
		};

		set({ settings: updated });

		await updateUserSettings(updated.id, metadata, updated.updatedAt);
	},

	clearSettings: () => set({ settings: null }),
}));
