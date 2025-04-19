import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/ui/icon";
import OnboardingViewContainer from "./onboardingViewContainer";

export default function RegisterOptions() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();

	return (
		<OnboardingViewContainer>
			<div className="flex flex-col h-full justify-center">
				<div className="flex justify-center pb-4">
					<Icon.brandLogo className="w-24 h-24 md:w-32 md:h-32 fill-accent hover:fill-accent-hover transition-discrete duration-100 ease-in-out" />
				</div>
				<h1 className="mb-4 text-center text-2xl md:text-3xl font-bold text-normal">
					Register to begin reading
				</h1>
				<p className="mb-8 text-center text-sm md:text-base text-muted">
					Join our community and start your reading journey today. Choose a registration option below to
					get started.
				</p>
			</div>
			<div className="flex flex-col">
				<div className="flex flex-col gap-2 mb-8">
					<Button
						variant="accent"
						rounded="full"
						size="lg"
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerEmailForm)}
					>
						Continue with email
					</Button>
					<Button variant="outline" rounded="full" size="lg">
						Continue with Google
					</Button>
				</div>
				<div className="mb-2 text-sm text-muted text-center">
					Have an account?{" "}
					<span
						className="text-muted font-semibold cursor-pointer hover:underline underline-offset-2"
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.loginOptions)}
					>
						Log in now
					</span>
				</div>
			</div>
		</OnboardingViewContainer>
	);
}
