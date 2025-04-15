import { BaseDirectory } from "@tauri-apps/plugin-fs";

export const LIBRARIES_FOLDER = "Libraries";
export const CONFIG_FOLDER = "config";
export const CACHE_FOLDER = "_cache";
export const TEMP_FOLDER = "temp";
export const LOGS_FOLDER = "Logs";
export const DATA_FOLDER = "Data";
export const BACKUPS_FOLDER = "Backups";

export enum LogSeverity {
	normal,
	warning,
	error,
	info,
	debug,
	success,
	critical,
}

export const BASE_DIR = BaseDirectory.AppLocalData;
