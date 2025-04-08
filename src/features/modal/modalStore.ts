import { create } from "zustand";
import { Modal } from "./types";

type ModalState = {
	modals: Modal[];
	openModal: (modal: Modal) => void;
	closeModal: () => void;
	closeModalById: (id: string) => void;
	closeAllModals: () => void;
};

const useModalStore = create<ModalState>((set) => ({
	modals: [],

	openModal: (modal: Modal) => {
		modal?.onOpen?.();
		set((state) => ({ modals: [...state.modals, modal] }));
	},

	closeModal: () => {
		set((state) => {
			const modals = state.modals;
			const modalToClose = modals[modals.length - 1];
			modalToClose?.onClose?.();
			return { modals: modals.slice(0, -1) };
		});
	},

	closeModalById: (id: string) => {
		set((state) => {
			const modals = state.modals.filter((modal) => modal.id !== id);
			const modalToClose = state.modals.find((modal) => modal.id === id);
			modalToClose?.onClose?.();
			return { modals };
		});
	},

	closeAllModals: () => {
		set((state) => {
			state.modals.forEach((modal) => modal.onClose?.());
			return { modals: [] };
		});
	},
}));

export default useModalStore;
