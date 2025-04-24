import { create } from "zustand";
import { type Notification } from "./types";

export type NotificationStoreState = {
	notifications: Notification[];
	notify: (notification: Notification) => void;
	closeNotification: () => void;
	closeNotificationById: (id: string) => void;
};

const useNotificationStore = create<NotificationStoreState>((set) => ({
	notifications: [],

	notify: (notification: Notification) => {
		notification?.onOpen?.();

		set((state) => ({ notifications: [...state.notifications, notification] }));
		setTimeout(() => {}, notification.duration);
	},

	closeNotification: () => {
		set((state) => {
			const notifications = state.notifications;
			const notificationToClose = notifications[notifications.length - 1];
			notificationToClose?.onClose?.();
			return { notifications: notifications.slice(0, -1) };
		});
	},

	closeNotificationById: (id: string) => {
		set((state) => {
			const notifications = state.notifications.filter((notification) => notification.id !== id);
			const notificationToClose = state.notifications.find((notification) => notification.id === id);
			notificationToClose?.onClose?.();
			return { notifications };
		});
	},
}));

export default useNotificationStore;
