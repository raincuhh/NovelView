import { isTauri as packageIsTauri } from "@tauri-apps/api/core";
import { GenderType } from "./types";
import { platform } from "@tauri-apps/plugin-os";

export const isTauri = async (): Promise<boolean> => packageIsTauri();

export const getPlatform = () => platform();

export const genderEnumToFullWord = (gender: GenderType): string => {
	switch (gender) {
		case "male":
			return "male";
		case "female":
			return "Female";
		case "nonBinary":
			return "Non-Binary";
		case "other":
			return "Other";
		case "preferNotToSay":
			return "Prefer not to say";
		default:
			throw new Error("Invalid gender value");
	}
};
