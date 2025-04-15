import { useEffect } from "react";
import { mkdir, exists, BaseDirectory } from "@tauri-apps/plugin-fs";
import {
	LIBRARIES_FOLDER,
	USER_FOLDER,
	CONFIG_FOLDER,
	CACHE_FOLDER,
	TEMP_FOLDER,
	LOGS_FOLDER,
	DATA_FOLDER,
	BACKUPS_FOLDER,
} from "../../consts";
import { appDataDir } from "@tauri-apps/api/path";

export default function SetupAppData() {
	useEffect(() => {
		const setup = async () => {
			console.log("initalizing appdata at: ", appDataDir());

			const foldersToInit = [
				LIBRARIES_FOLDER,
				USER_FOLDER,
				CONFIG_FOLDER,
				CACHE_FOLDER,
				TEMP_FOLDER,
				LOGS_FOLDER,
				DATA_FOLDER,
				BACKUPS_FOLDER,
			];

			for (const folder of foldersToInit) {
				const existsAlready = await exists(folder, { baseDir: BaseDirectory.AppLocalData });

				if (!existsAlready) {
					await mkdir(folder, { baseDir: BaseDirectory.AppLocalData });
					console.log(`created: ${folder}`);
				} else {
					console.log(`already exists: ${folder}`);
				}
			}
		};

		setup();
	}, []);

	return null;
}
