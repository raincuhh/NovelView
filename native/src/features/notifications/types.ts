import { ReactNode } from "@tanstack/react-router";

export type Notification = {
	id: string;
	content: ReactNode;
	duration: number;

	onOpen?: () => void;
	onClose?: () => void;
};
