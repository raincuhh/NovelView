import { isTauri as packageIsTauri } from "@tauri-apps/api/core";

export const isTauri = async (): Promise<boolean> => {
	return packageIsTauri();
};

export const getPlatform = async (): Promise<string> => {
	if (await isTauri()) return "tauri-desktop";
	return "web";
};
