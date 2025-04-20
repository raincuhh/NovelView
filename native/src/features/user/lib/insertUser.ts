import { powersyncDb } from "@/shared/providers/systemProvider";
import { getDefaultUserReadingPrefs } from "./utils";
import { UserProfile, UserReadingPrefsMetadata, UserSettings } from "../types";
import { RegisterFormData } from "@/pages/onboarding/registerFormStore";

export const insertNewUser = async (formData: RegisterFormData, auth: { userId: string; email: string }) => {
	try {
		const { gender, DOB, username } = formData;
		const { userId } = auth;

		const userProfileData: UserProfile = {
			id: userId,
			username,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const userSettingsData: UserSettings = {
			id: userId,
			metadata: { language: "en" },
			theme: "dark",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const userReadingPrefsData: UserReadingPrefsMetadata = getDefaultUserReadingPrefs(); // Get default prefs

		await powersyncDb.writeTransaction(async (tx) => {
			// user profile
			const profileExists = await tx.getOptional("SELECT * FROM user_profiles WHERE id = ?", [userId]);
			if (!profileExists) {
				await tx.execute(
					"INSERT INTO user_profiles (id, username, gender, dob, avatar_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, datetime(), datetime())",
					[userId, userProfileData.username, gender, DOB, userProfileData.avatarUrl]
				);
				console.log("Seeded local user profile for:", userId);
			}

			// user settings
			const settingsExists = await tx.getOptional("SELECT * FROM user_settings WHERE id = ?", [userId]);
			if (!settingsExists) {
				await tx.execute(
					"INSERT INTO user_settings (id, theme, metadata, created_at, updated_at) VALUES (?, ?, ?, datetime(), datetime())",
					[userId, userSettingsData.theme, JSON.stringify(userSettingsData.metadata)]
				);
				console.log("Seeded local user settings for:", userId);
			}

			// user reading preferences
			const prefsExists = await tx.getOptional("SELECT * FROM user_reading_prefs WHERE id = ?", [userId]);
			if (!prefsExists) {
				await tx.execute("INSERT INTO user_reading_prefs (id, prefs) VALUES (?, ?)", [
					userId,
					JSON.stringify(userReadingPrefsData),
				]);
				console.log("Seeded local user reading prefs for:", userId);
			}
		});

		return { success: true };
	} catch (error) {
		console.error("Error inserting user data:", error);
		throw new Error("Error inserting new user");
	}
};
