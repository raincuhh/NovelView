import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LibrarySettings } from "./types";
import { DEFAULT_LIBRARY_SETTINGS } from "./consts";

interface LibrarySettingsState {
	settings: LibrarySettings;
	setSettings: (partial: Partial<LibrarySettings>) => void;
	reset: () => void;
}

export const librarySettingsStore = create<LibrarySettingsState>()(
	persist(
		(set) => ({
			settings: DEFAULT_LIBRARY_SETTINGS,
			setSettings: (partial) =>
				set((state) => ({
					settings: { ...state.settings, ...partial },
				})),
			reset: () => set({ settings: DEFAULT_LIBRARY_SETTINGS }),
		}),
		{
			name: "library-settings",
		}
	)
);
