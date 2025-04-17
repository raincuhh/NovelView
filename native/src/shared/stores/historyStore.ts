import { useRouter } from "@tanstack/react-router";
import { create } from "zustand";

type HistoryStoreState = {
	router: ReturnType<typeof useRouter> | null;
	setRouter: (router: ReturnType<typeof useRouter>) => void;

	historyStack: string[];
	currentIndex: number;

	navigateTo: (path: string) => void;
	goBack: () => void;
	goForward: () => void;

	canGoBack: boolean;
	canGoForward: boolean;
};

export const useHistoryStore = create<HistoryStoreState>((set, get) => ({
	router: null,
	setRouter: (router) => set({ router: router }),
	historyStack: ["/home"],
	currentIndex: 0,

	navigateTo: (path: string) => {
		const { currentIndex, historyStack, router } = get();
		if (!router) return;

		const trimmed = historyStack.slice(0, currentIndex + 1);
		const updated = [...trimmed, path];
		set({
			historyStack: updated,
			currentIndex: updated.length - 1,
		});
		router.navigate({ to: path });
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
}));
