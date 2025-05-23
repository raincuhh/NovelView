import { useAuthStore } from "@/features/auth/authStore";
import { usePowerSync } from "@powersync/react";
import { useEffect } from "react";
import { powersyncDb, useAvatarsQueue, useBookFilesQueue, useLibraryCoversQueue } from "./systemProvider";
import SyncService from "../services/sync";

const SyncServiceProvider = ({ children }: { children: React.ReactNode }) => {
	const powersync = usePowerSync();
	const libraryCoversQueue = useLibraryCoversQueue();
	const bookFilesQueue = useBookFilesQueue();
	const avatarsQueue = useAvatarsQueue();
	const { getUserId } = useAuthStore();
	const userId = getUserId();

	useEffect(() => {
		if (!libraryCoversQueue || !bookFilesQueue || !avatarsQueue)
			throw new Error("No library covers queue.");
		const syncService = new SyncService(
			powersyncDb,
			libraryCoversQueue,
			bookFilesQueue,
			avatarsQueue,
			userId
		);

		syncService.init().catch(console.error);
	}, [powersync, userId]);

	return <>{children}</>;
};

export default SyncServiceProvider;
