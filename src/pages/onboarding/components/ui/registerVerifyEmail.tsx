import { useEffect } from "react";
import OnboardingViewContainer from "./onboardingViewContainer";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/shared/providers/systemProvider";

export default function RegisterVerifyEmail() {
	const navigate = useNavigate();

	useEffect(() => {
		let interval: NodeJS.Timeout;

		const checkConfirmation = async () => {
			const { data } = await supabase.client.auth.getUser();
			if (data.user?.email_confirmed_at) {
				clearInterval(interval);
				navigate({ to: "/" });
			}
		};

		checkConfirmation();
		interval = setInterval(checkConfirmation, 4000);

		return () => clearInterval(interval);
	}, []);

	return <OnboardingViewContainer>Please check your email for verifying email</OnboardingViewContainer>;
}
