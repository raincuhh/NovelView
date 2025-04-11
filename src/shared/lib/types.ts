export type DateOfBirth = `${number}-${number}-${number}`;

export enum Gender {
	male = "male",
	female = "female",
	nonBinary = "nonBinary",
	other = "other",
	preferNotToSay = "preferNotToSay",
}

export type GenderType = keyof typeof Gender;
