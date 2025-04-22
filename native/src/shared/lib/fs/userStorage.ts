import { appDataDir } from "@tauri-apps/api/path";

let userStoragePath: string = ""; // is localappdata dir but yeah.

export async function initUserStoragePath() {
	userStoragePath = await appDataDir();
	if (!userStoragePath.endsWith("/")) {
		userStoragePath += "/";
	}
}

export function getUserStoragePathSync(): string {
	if (!userStoragePath) {
		throw new Error("User storage path not initialized");
	}
	return userStoragePath;
}
