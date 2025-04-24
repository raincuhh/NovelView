import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { CombinedOnboardingViews } from "@/pages/onboarding/types";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/ui/icon";
import { cn } from "@/shared/lib/globalUtils";

const viewTitles: Partial<Record<CombinedOnboardingViews, string>> = {
	[CombinedOnboardingViews.loginOptions]: "",
	[CombinedOnboardingViews.registerOptions]: "",

	[CombinedOnboardingViews.loginForm]: "Login",
	[CombinedOnboardingViews.resetPasswordForm]: "Reset Password",
	[CombinedOnboardingViews.forgotPasswordForm]: "Forgot Password",
	[CombinedOnboardingViews.verifyEmailForm]: "Verify Email",

	[CombinedOnboardingViews.registerEmailForm]: "Register",
	[CombinedOnboardingViews.registerPasswordForm]: "Register",
	[CombinedOnboardingViews.registerGenderForm]: "Register",
	[CombinedOnboardingViews.registerDOBForm]: "Register",
	[CombinedOnboardingViews.registerUsernameForm]: "Register",
	[CombinedOnboardingViews.registerFinish]: "Finalize",
	// [CombinedOnboardingViews.registerVerifyEmail]: "VerifyEmail",
};

export function OnboardingHeader() {
	const { currentView, goBack, canGoBack } = useViewTransition<CombinedOnboardingViews>();
	const title = viewTitles[currentView];

	if (!title && !canGoBack) return null;

	return (
		<header
			className={cn(
				"flex items-center justify-center px-6 py-3 min-h-14"
				// canGoBack ? "border-solid border-b border-border" : ""
			)}
		>
			<div className="relative h-full w-full flex justify-center items-center">
				{title ? <h1 className="font-bold text-lg select-none">{title}</h1> : null}
				{canGoBack ? (
					<div className="absolute h-full w-full">
						<Button size="icon" variant="ghost" onClick={goBack} className="h-full w-[31px]">
							<Icon.leftArrowAlt className="w-6 h-6" />
						</Button>
					</div>
				) : null}
			</div>
		</header>
	);
}
