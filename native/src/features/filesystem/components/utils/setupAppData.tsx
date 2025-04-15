import { useEffect } from "react";
import { mkdir, exists, BaseDirectory } from "@tauri-apps/plugin-fs";
// import { Command } from "@tauri-apps/plugin-shell";
import {
	LIBRARIES_FOLDER,
	CONFIG_FOLDER,
	CACHE_FOLDER,
	TEMP_FOLDER,
	LOGS_FOLDER,
	DATA_FOLDER,
	BACKUPS_FOLDER,
} from "../../consts";

export default function SetupAppData() {
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
				const existsAlready = await exists(folder, { baseDir: BaseDirectory.AppLocalData });

				if (!existsAlready) {
					await mkdir(folder, { baseDir: BaseDirectory.AppLocalData });
					// console.log(`created: ${folder}`);
				} else {
					// console.log(`already exists: ${folder}`);
				}
			}

			return true;
		};

		const hideFolders = async () => {
			// console.log("hiding folders.");
			// try {
			// 	const result = await Command.create("hide_folders", [
			// 		"-c",
			// 		`
			// 		  APPDATA_DIR="./AppData/Local/novelview"
			// 		  CACHE_FOLDER="$APPDATA_DIR/_cache"
			// 		  DATA_FOLDER="$APPDATA_DIR/Data"
			// 		  if [ -d "$CACHE_FOLDER" ]; then
			// 			 # macOS
			// 			 if [[ "$OSTYPE" == "darwin"* ]]; then
			// 				chflags hidden "$CACHE_FOLDER"
			// 			 else
			// 				# Linux
			// 				mv "$CACHE_FOLDER" "$APPDATA_DIR/.cache"
			// 			 fi
			// 			 echo "Cache folder is now hidden"
			// 		  else
			// 			 echo "Cache folder does not exist."
			// 		  fi
			// 		  if [ -d "$DATA_FOLDER" ]; then
			// 			 # macOS
			// 			 if [[ "$OSTYPE" == "darwin"* ]]; then
			// 				chflags hidden "$DATA_FOLDER"
			// 			 else
			// 				# Linux
			// 				mv "$DATA_FOLDER" "$APPDATA_DIR/.data"
			// 			 fi
			// 			 echo "Data folder is now hidden"
			// 		  else
			// 			 echo "Data folder does not exist."
			// 		  fi
			// 		`,
			// 	]).execute();
			// 	console.log("Shell command result:", result);
			// } catch (err: any) {
			// 	console.error("Error invoking hide_appdata_folders: ", err);
			// }
		};

		const setup = async () => {
			const finished = await setupFolders();
			if (finished) await hideFolders();
		};

		setup();
	}, []);

	return null;
}
