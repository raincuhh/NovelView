import { create } from "zustand";
import { DrawerID } from "./types";

type DrawerStore = {
	openDrawers: Record<DrawerID, boolean>;
	openDrawer: (id: DrawerID) => void;
	closeDrawer: (id: DrawerID) => void;
	toggleDrawer: (id: DrawerID) => void;
	isOpen: (id: DrawerID) => boolean;
	closeAll: () => void;
};

export const useDrawerStore = create<DrawerStore>((set, get) => ({
	openDrawers: {},

	openDrawer: (id) =>
		set((state) => ({
			openDrawers: { ...state.openDrawers, [id]: true },
		})),

	closeDrawer: (id) =>
		set((state) => ({
			openDrawers: { ...state.openDrawers, [id]: false },
		})),

	toggleDrawer: (id) =>
		set((state) => ({
			openDrawers: {
				...state.openDrawers,
				[id]: !state.openDrawers[id],
			},
		})),

	isOpen: (id) => !!get().openDrawers[id],

	closeAll: () => set({ openDrawers: {} }),
}));
