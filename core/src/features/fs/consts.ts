import { BaseDirectory } from "@tauri-apps/plugin-fs";

export const LIBRARIES_FOLDER = "libraries";
export const CONFIG_FOLDER = "config";
export const CACHE_FOLDER = "_cache";
export const TEMP_FOLDER = "temp";
export const LOGS_FOLDER = "logs";
export const DATA_FOLDER = "data";
export const BACKUPS_FOLDER = "backups";
export const BOOKS_FOLDER = "books";

export const LOCAL_APPDATA = BaseDirectory.AppLocalData;
export const APPDATA = BaseDirectory.AppData;

export const FULL_BOOKS_FOLDER = LOCAL_APPDATA + "/" + BOOKS_FOLDER;
export const FULL_LIBRARIES_FOLDER = LOCAL_APPDATA + "/" + LIBRARIES_FOLDER;
