import RenderList from "@/shared/components/utils/renderList";
import useNotificationStore from "../../notificationStore";
import { Notification } from "../../types";

export default function NotificationRoot() {
	const notifications: Notification[] = useNotificationStore((s) => s.notifications);

	return (
		<div>
			<RenderList
				data={notifications}
				getKey={(notification, i) => notification.id + i}
				render={(notification: Notification) => (
					<div className="w-screen h-screen absolute top-0 left-0">{notification.content}</div>
				)}
			/>
		</div>
	);
}
