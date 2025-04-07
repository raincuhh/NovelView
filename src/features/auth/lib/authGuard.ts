import { BeforeLoadContextOptions, redirect, RootRoute } from "@tanstack/react-router";
import { supabase, db } from "@/shared/providers/systemProvider";

export const requireAuth = async ({ location }: { location: Location }) => {
	const session = await supabase.getSession();

	if (!session) {
		throw redirect({
			to: "/onboarding",
			search: { redirect: location.href },
		});
	}
};

export const preventAuth = async (ctx: BeforeLoadContextOptions<RootRoute, {}, {}, {}, {}>) => {
	const { location } = ctx;
	const session = await supabase.getSession();

	if (session) {
		throw redirect({
			to: "/home",
			search: { redirect: location.href },
		});
	}
};

export const requireOnboarding = async ({ location }: { location: Location }) => {
	const session = await supabase.getSession();
	if (!session) throw redirect({ to: "/onboarding", search: { redirect: location.href } });

	const userId = session.user.id;

	let onboardingCompleted: boolean = false;

	try {
		const results = await db.get<{ onboarding_completed: boolean }>(
			"SELECT onboarding_completed FROM user_settings WHERE id = ?",
			[userId]
		);
		if (results) {
			onboardingCompleted = results.onboarding_completed;

			if (!onboardingCompleted) {
				throw redirect({
					to: "/onboarding",
					search: { redirect: location.href },
				});
			}
		} else {
			const { data, error } = await supabase.client
				.from("user_settings")
				.select("onboarding_completed")
				.eq("user_id", userId)
				.single();

			if (error) throw error;

			onboardingCompleted = data?.onboarding_completed;

			if (!onboardingCompleted) {
				throw redirect({
					to: "/onboarding",
					search: { redirect: location.href },
				});
			}
		}
	} catch (err) {
		console.error("Failed to check onboarding status: ", err);
		throw redirect({
			to: "/onboarding",
			search: { redirect: location.href },
		});
	}
};
