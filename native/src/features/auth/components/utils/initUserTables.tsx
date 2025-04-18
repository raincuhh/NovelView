// InitUserTables.tsx
import { useEffect } from "react";
import { powersyncDb } from "@/shared/providers/systemProvider";
import { useAuthStore } from "@/features/auth/authStore";
import { useRegisterFormStore } from "@/pages/onboarding/registerFormStore";

export default function InitUserTables() {
	const user = useAuthStore((state) => state.user?.auth);
	const { formData } = useRegisterFormStore();

	useEffect(() => {
		if (!user) return;

		const init = async () => {
			const userId = user.id;
			console.log("initializing user tables");

			const existing = await powersyncDb.getOptional<{ id: string }>(
				"SELECT id FROM profiles WHERE user_id = ?",
				[userId]
			);

			if (existing?.id) {
				console.log("User already initialized");
				return;
			}

			await powersyncDb.writeTransaction(async (tx) => {
				tx.execute(
					`INSERT INTO profiles (
            				id,
            				user_id,
            				username,
            				gender,
            				dob,
            				created_at,
            				updated_at,
            				avatar_url
            			) VALUES (uuid(), ?, ?, ?, ?, datetime(), datetime(), ?)`,
					[user.id, formData.username, formData.gender, formData.DOB, null]
				);
				console.log("Inserted into profiles");

				tx.execute(
					`INSERT INTO user_settings (
            					id,
            					user_id,
            					onboarding_completed,
            					app_theme,
            					app_accent,
            					font_size,
            					language,
            					notifications_enabled,
            					created_at,
            					updated_at
            			  ) VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, datetime(), datetime())`,
					[user.id, true, "default", "default", 14, "en", true]
				);
				console.log("Inserted into user_settings");
			});
		};

		init();
	}, [user]);

	return null;
}
