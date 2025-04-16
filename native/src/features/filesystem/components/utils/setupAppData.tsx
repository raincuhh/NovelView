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
import { hideFileOrFolder } from "../../lib/utils";
import { appLocalDataDir, join } from "@tauri-apps/api/path";

export default function SetupAppdata() {
	useEffect(() => {
		const foldersToInit = [
			LIBRARIES_FOLDER,
			CONFIG_FOLDER,
			CACHE_FOLDER,
			TEMP_FOLDER,
			LOGS_FOLDER,
			DATA_FOLDER,
			BACKUPS_FOLDER,
		];

		const setupFolders = async (): Promise<boolean> => {
			// const created: string[] = [];

			for (const folder of foldersToInit) {
				const existsAlready = await exists(folder, { baseDir: LOCAL_APPDATA });

				if (!existsAlready) {
					await mkdir(folder, { baseDir: LOCAL_APPDATA });
					// created.push(folder);
				}
			}

			return true;
		};

		const hideFolders = async () => {
			const basePath = await appLocalDataDir();

			const foldersToHide = [DATA_FOLDER, TEMP_FOLDER];

			for (const folder of foldersToHide) {
				const fullPath = await join(basePath, folder);

				if (foldersToHide) console.log(folder, " ", fullPath);
				await hideFileOrFolder(fullPath);
			}
		};

		const setup = async () => {
			const finished = await setupFolders();
			if (finished) await hideFolders();
		};

		setup();
	}, []);

	return null;
}
