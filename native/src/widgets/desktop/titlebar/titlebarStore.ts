import { create } from "zustand";
import { getPlatform } from "@/shared/lib/projectUtils";

type TitlebarButton = "minimize" | "maximize" | "close";
type TitlebarButtonAlignment = "left" | "right";

export type TitlebarStoreState = {
	buttons: TitlebarButton[];
	platform: string | null;
	alignment: TitlebarButtonAlignment;
	setButtons: (buttons: TitlebarButton[]) => void;
	addButton: (button: TitlebarButton) => void;
	removeButton: (button: TitlebarButton) => void;
	resetButtons: () => void;
	detectPlatform: () => Promise<void>;
};

export const useTitlebarStore = create<TitlebarStoreState>((set) => ({
	buttons: ["minimize", "maximize", "close"],
	platform: null,
	alignment: "right",

	setButtons: (buttons) => set({ buttons }),

	addButton: (button) =>
		set((state) => ({
			buttons: state.buttons.includes(button) ? state.buttons : [...state.buttons, button],
		})),

	removeButton: (button) =>
		set((state) => ({
			buttons: state.buttons.filter((b) => b !== button),
		})),

	resetButtons: () =>
		set((state) => {
			if (state.platform === "macos") {
				return {
					buttons: ["close", "minimize", "maximize"],
					alignment: "left",
				};
			}
			return {
				buttons: ["minimize", "maximize", "close"],
				alignment: "right",
			};
		}),

	detectPlatform: async () => {
		const platform = await getPlatform();
		set({ platform });

		if (platform === "macos") {
			set({
				buttons: ["close", "minimize", "maximize"],
				alignment: "left",
			});
		} else {
			set({
				buttons: ["minimize", "maximize", "close"],
				alignment: "right",
			});
		}
	},
}));
