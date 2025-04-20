import { remove, exists } from "@tauri-apps/plugin-fs";
import { appDataDir, appLocalDataDir, join } from "@tauri-apps/api/path";
import {
	LIBRARIES_FOLDER,
	CONFIG_FOLDER,
	CACHE_FOLDER,
	TEMP_FOLDER,
	LOGS_FOLDER,
	DATA_FOLDER,
	BACKUPS_FOLDER,
	BOOKS_FOLDER,
} from "../consts";

export default function deleteAppdata() {
	const deleteAppdata = async (): Promise<boolean> => {
		try {
			const localAppdataPath = await appLocalDataDir();
			const remoteAppdataPath = await appDataDir();

			const foldersToDelete = [
				LIBRARIES_FOLDER,
				CONFIG_FOLDER,
				CACHE_FOLDER,
				TEMP_FOLDER,
				LOGS_FOLDER,
				DATA_FOLDER,
				BACKUPS_FOLDER,
				BOOKS_FOLDER,
			];

			for (const folder of foldersToDelete) {
				const folderPath = await join(localAppdataPath, folder);
				const folderExists = await exists(folderPath);
				if (folderExists) {
					await remove(folderPath, { recursive: true });
					console.log(`Deleted folder: ${folder}`);
				}
			}

			const localDbPath = await join(remoteAppdataPath, "local.db");
			const sessionDbPath = await join(remoteAppdataPath, "session.db");

			const localDbExists = await exists(localDbPath);
			if (localDbExists) {
				await remove(localDbPath);
				console.log("Deleted database: local.db");
			}

			const sessionDbExists = await exists(sessionDbPath);
			if (sessionDbExists) {
				await remove(sessionDbPath);
				console.log("Deleted database: session.db");
			}

			console.log("All data has been deleted successfully.");
			return true;
		} catch (err: any) {
			console.error("Error deleting app data:", err);
			return false;
		}
	};

	const deletedAll = deleteAppdata();

	console.log("deleted all app files", deletedAll);
	location.reload();

	return null;
}
