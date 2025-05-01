import { create } from "zustand";
import { LibrariesSettings } from "./types";
import { persist } from "zustand/middleware";
import { DEFAULT_LIBRARIES_SETTINGS } from "./consts";

interface LibrariesSettingsState {
	settings: LibrariesSettings;
	setSettings: (partial: Partial<LibrariesSettings>) => void;
	reset: () => void;
}

export const useLibrariesSettingsStore = create<LibrariesSettingsState>()(
	persist(
		(set) => ({
			settings: DEFAULT_LIBRARIES_SETTINGS,
			setSettings: (partial) =>
				set((state) => ({
					settings: { ...state.settings, ...partial },
				})),
			reset: () => set({ settings: DEFAULT_LIBRARIES_SETTINGS }),
		}),
		{
			name: "libraries-settings",
		}
	)
);
