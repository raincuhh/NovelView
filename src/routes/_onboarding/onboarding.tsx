import { ElementType } from "react";
import { ViewTransitionProvider } from "@/shared/providers/viewTransitionProvider";
import { createFileRoute } from "@tanstack/react-router";
import { CombinedOnboardingViews } from "@/pages/onboarding/types";
import { AnimatedTransitionContent } from "@/shared/components/utils/AnimatedTransitionContent";
import Welcome from "@/pages/onboarding/components/ui/welcome";
import LoginOptions from "@/pages/onboarding/components/ui/loginOptions";
import LoginForm from "@/features/auth/components/ui/loginForm";
import ResetPasswordForm from "@/features/auth/components/ui/resetPasswordForm";
import ForgotPasswordForm from "@/features/auth/components/ui/forgotPasswordForm";
import VerifyEmailForm from "@/features/auth/components/ui/verifyEmailForm";
import RegisterOptions from "@/pages/onboarding/components/ui/registerOptions";
import RegisterEmailForm from "@/pages/onboarding/components/ui/registerEmailForm";
import RegisterPasswordForm from "@/pages/onboarding/components/ui/registerPasswordForm";
import RegisterGenderForm from "@/pages/onboarding/components/ui/registerGenderForm";
import RegisterDOBForm from "@/pages/onboarding/components/ui/registerDOBForm";
import RegisterUsernameForm from "@/pages/onboarding/components/ui/registerUsernameForm";
import RegisterFinish from "@/pages/onboarding/components/ui/registerFinish";
import RegisterVerifyEmail from "@/pages/onboarding/components/ui/registerVerifyEmail";
import { OnboardingHeader } from "@/pages/onboarding/components/ui/onboardingHeader";

const viewComponents: Record<CombinedOnboardingViews, ElementType> = {
	[CombinedOnboardingViews.welcome]: Welcome,
	[CombinedOnboardingViews.loginOptions]: LoginOptions,
	[CombinedOnboardingViews.registerOptions]: RegisterOptions,

	[CombinedOnboardingViews.loginForm]: LoginForm,
	[CombinedOnboardingViews.resetPasswordForm]: ResetPasswordForm,
	[CombinedOnboardingViews.forgotPasswordForm]: ForgotPasswordForm,
	[CombinedOnboardingViews.verifyEmailForm]: VerifyEmailForm,

	[CombinedOnboardingViews.registerEmailForm]: RegisterEmailForm,
	[CombinedOnboardingViews.registerPasswordForm]: RegisterPasswordForm,
	[CombinedOnboardingViews.registerGenderForm]: RegisterGenderForm,
	[CombinedOnboardingViews.registerDOBForm]: RegisterDOBForm,
	[CombinedOnboardingViews.registerUsernameForm]: RegisterUsernameForm,
	[CombinedOnboardingViews.registerFinish]: RegisterFinish,
	[CombinedOnboardingViews.registerVerifyEmail]: RegisterVerifyEmail,
};

export const Route = createFileRoute("/_onboarding/onboarding")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="absolute h-screen w-screen flex flex-col">
			<div className=" sm:mx-auto sm:w-full sm:max-w-sm h-full">
				<ViewTransitionProvider
					initialView={CombinedOnboardingViews.welcome}
					duration={250}
					type={CombinedOnboardingViews}
				>
					<div className="flex flex-col flex-1 overflow-hidden w-full h-full relative ">
						<OnboardingHeader />
						<AnimatedTransitionContent<CombinedOnboardingViews>
							viewComponents={viewComponents}
							initial="enter"
						/>
					</div>
				</ViewTransitionProvider>
			</div>
		</div>
	);
}
