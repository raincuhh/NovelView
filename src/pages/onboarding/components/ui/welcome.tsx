import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/ui/icon";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import OnboardingViewContainer from "./onboardingViewContainer";

export default function Welcome() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();

	return (
		<OnboardingViewContainer>
			<div className="flex flex-col h-full justify-center">
				<div className="flex justify-center pb-4">
					<Icon.brandLogo className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] fill-accent hover:fill-accent-hover transition-discrete duration-100 ease-in-out" />
				</div>
				<h1 className="mb-16 md:mb-32 text-center text-2xl md:text-3xl font-bold">
					Your books, your library, your experience.
				</h1>
			</div>
			<div className="flex flex-col">
				<div className="flex flex-col gap-2 mb-6 md:mb-8">
					<Button
						variant="accent"
						rounded="full"
						size="lg"
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerOptions)}
						aria-label="register options"
					>
						Register Now
					</Button>
					<Button
						variant="outline"
						rounded="full"
						size="lg"
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.loginOptions)}
						aria-label="login options"
					>
						Log in
					</Button>
					<Button
						variant="outline"
						rounded="full"
						size="lg"
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerVerifyEmail)}
						aria-label="login options"
					>
						test ( go to email verify view)
					</Button>
				</div>
				<div className="mb-2 text-sm text-muted text-center">
					By continuing, you agree to our <span className="font-bold">Terms of Service</span> and{" "}
					<span className="font-bold">Privacy Policy</span>.
				</div>
			</div>
		</OnboardingViewContainer>
	);
}
