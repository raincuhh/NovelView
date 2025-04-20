export type DateOfBirth = `${number}-${number}-${number}`;
export type Timestamp = string;

export enum Gender {
	male = "male",
	female = "female",
	nonBinary = "nonBinary",
	other = "other",
	preferNotToSay = "preferNotToSay",
}

export type GenderType = keyof typeof Gender;

export enum Theme {
	light = "light",
	dark = "dark",
	system = "system",
	custom = "custom",
}

export type ThemeType = keyof typeof Theme;

export interface Metadata {
	[key: string]: any;
}
