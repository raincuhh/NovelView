import { isTauri as packageIsTauri } from "@tauri-apps/api/core";

// export const genderEnumToFullWord = (gender: GenderType): string => {
// 	switch (gender) {
// 		case "male":
// 			return "male";
// 		case "female":
// 			return "Female";
// 		case "nonBinary":
// 			return "Non-Binary";
// 		case "other":
// 			return "Other";
// 		case "preferNotToSay":
// 			return "Prefer not to say";
// 		default:
// 			throw new Error("Invalid gender value");
// 	}
// };

export const isTauri = async (): Promise<boolean> => {
	return packageIsTauri();
};

export const getPlatform = async (): Promise<string> => {
	if (await isTauri()) return "tauri-desktop";
	return "web";
};

export const isProd = (): boolean => {
	return process.env.MODE === "production";
};

export const isDev = (): boolean => {
	return process.env.MODE === "development";
};
