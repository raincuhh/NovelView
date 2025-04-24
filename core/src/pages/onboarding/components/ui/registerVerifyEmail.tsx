import { useEffect } from "react";
import OnboardingViewContainer from "./onboardingViewContainer";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/shared/providers/systemProvider";

export default function RegisterVerifyEmail() {
	const navigate = useNavigate();

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.client.auth.onAuthStateChange(async (_, session) => {
			console.log("verifyEmail checks: ", session?.user);
			if (session?.user?.email_confirmed_at) {
				navigate({ to: "/home" });
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<OnboardingViewContainer>
			<div className="flex flex-col gap-2 mt-12">
				<h1 className="text-2xl font-semibold select-none">Verify Your Email</h1>
				<div className="flex flex-col">
					<p className="text-muted text-sm">Please check your Email for the one time link.</p>
				</div>
			</div>
		</OnboardingViewContainer>
	);
}
