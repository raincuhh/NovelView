import { useEffect } from "react";
import { mkdir, exists } from "@tauri-apps/plugin-fs";
// import { Command } from "@tauri-apps/plugin-shell";
import {
	LIBRARIES_FOLDER,
	CONFIG_FOLDER,
	CACHE_FOLDER,
	TEMP_FOLDER,
	LOGS_FOLDER,
	DATA_FOLDER,
	BACKUPS_FOLDER,
	LOCAL_APPDATA,
} from "../../consts";

export default function SetupAppdata() {
	useEffect(() => {
		const setupFolders = async (): Promise<boolean> => {
			const foldersToInit = [
				LIBRARIES_FOLDER,
				CONFIG_FOLDER,
				CACHE_FOLDER,
				TEMP_FOLDER,
				LOGS_FOLDER,
				DATA_FOLDER,
				BACKUPS_FOLDER,
			];

			for (const folder of foldersToInit) {
				const existsAlready = await exists(folder, { baseDir: LOCAL_APPDATA });

				if (!existsAlready) {
					await mkdir(folder, { baseDir: LOCAL_APPDATA });
				}
			}

			return true;
		};

		const hideFolders = async () => {};

		const setup = async () => {
			const finished = await setupFolders();
			if (finished) await hideFolders();
		};

		setup();
	}, []);

	return null;
}
