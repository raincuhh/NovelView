// InitUserTables.tsx
import { useEffect } from "react";
import { powersyncDb } from "@/shared/providers/systemProvider";
import { useAuthStore } from "@/features/auth/authStore";
import { useRegisterFormStore } from "@/pages/onboarding/registerFormStore";

export default function InitUserTables() {
	const userId = useAuthStore.getState().user?.profile.userId;
	const { formData } = useRegisterFormStore();

	useEffect(() => {
		if (!userId) return;

		const init = async () => {
			const [profile, settings, prefs] = await Promise.all([
				powersyncDb.getOptional("SELECT id FROM user_profiles WHERE id = ?", [userId]),
				powersyncDb.getOptional("SELECT id FROM user_settings WHERE id = ?", [userId]),
				powersyncDb.getOptional("SELECT id FROM user_reading_prefs WHERE id = ?", [userId]),
			]);

			const isInitialized = profile && settings && prefs;

			if (isInitialized) {
				console.log("User fully initialized");
				return;
			}

			await powersyncDb.writeTransaction(async (tx) => {
				// user profiles
				tx.execute(
					`INSERT INTO user_profiles (
						id, username, gender, dob, created_at, updated_at, avatar_url
					) VALUES (
						?, ?, ?, ?, datetime(), datetime(), ?
					)`,
					[userId, formData.username, formData.gender, formData.DOB, null]
				);

				// user settings
				tx.execute(
					`INSERT INTO user_settings (
						id, metadata, theme, created_at, updated_at
					) VALUES (
						?, ?, ?, datetime(), datetime()
					)`,
					[userId, JSON.stringify({}), "default"]
				);

				// user prefs
				tx.execute(
					`INSERT INTO user_reading_prefs (
						id, prefs
					) VALUES (
						?, ?
					)`,
					[
						userId,
						JSON.stringify({
							font_size: 14,
							language: "en",
							notifications_enabled: true,
						}),
					]
				);
			});
		};

		init();
	}, [userId]);

	return null;
}
