import { ReactNode } from "@tanstack/react-router";

export type Modal = {
	id: string;
	content: ReactNode;
	closable?: boolean;

	onOpen?: () => void;
	onClose?: () => void;
};
