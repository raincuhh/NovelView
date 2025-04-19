import { useRouter } from "@tanstack/react-router";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { useDrawerStore } from "@/features/drawer/drawerStore";
// import { DrawerID } from "@/features/drawer/types";

type NavigationTarget = string;

type HistoryStoreState = {
	router: ReturnType<typeof useRouter> | null;
	setRouter: (router: ReturnType<typeof useRouter>) => void;

	historyStack: NavigationTarget[];
	currentIndex: number;

	navigateTo: (target: NavigationTarget) => void;
	goBack: () => void;
	goForward: () => void;

	canGoBack: boolean;
	canGoForward: boolean;
};

export const useHistoryStore = create<HistoryStoreState>()(
	persist(
		(set, get) => ({
			router: null,
			setRouter: (router) => set({ router }),

			historyStack: [],
			currentIndex: 0,

			navigateTo: (target) => {
				const { currentIndex, historyStack, router } = get();
				if (!router) return;

				const trimmed = historyStack.slice(0, currentIndex + 1);
				const updated = [...trimmed, target];
				set({
					historyStack: updated,
					currentIndex: updated.length - 1,
				});
				router.navigate({ to: target });
			},

			goBack: () => {
				const { currentIndex, historyStack, router } = get();
				if (!router || currentIndex <= 0) return;

				const newIndex = currentIndex - 1;
				set({ currentIndex: newIndex });
				router.navigate({ to: historyStack[newIndex] });
			},

			goForward: () => {
				const { currentIndex, historyStack, router } = get();
				if (!router || currentIndex >= historyStack.length - 1) return;

				const newIndex = currentIndex + 1;
				set({ currentIndex: newIndex });
				router.navigate({ to: historyStack[newIndex] });
			},

			get canGoBack() {
				return get().currentIndex > 0;
			},

			get canGoForward() {
				return get().currentIndex < get().historyStack.length - 1;
			},
		}),
		{
			name: "history-storage",
			partialize: (state) => ({
				historyStack: state.historyStack,
				currentIndex: state.currentIndex,
			}),
			onRehydrateStorage: (state) => {
				if (state) {
					if (state.historyStack.length === 0) {
						state.historyStack = ["/home"];
						state.currentIndex = 0;
					}
				}
			},
		}
	)
);
