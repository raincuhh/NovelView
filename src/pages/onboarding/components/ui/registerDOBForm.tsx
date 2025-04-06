import React, { useState } from "react";
import OnboardingViewContainer from "./onboardingViewContainer";
import { Button } from "@/shared/components/ui/button";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { CombinedOnboardingViews } from "../../types";
import { baseRegisterFormSchema, useRegisterFormStore } from "../../registerFormStore";
import { DateOfBirth } from "@/shared/lib/types";
import DOB from "@/shared/components/ui/DOB";
import { Form } from "@/shared/components/ui/form";

const registerDOBSchema = baseRegisterFormSchema.pick({
	DOB: true,
});

export default function RegisterDOBForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const [isValid, setIsValid] = useState<boolean>(
		registerDOBSchema.safeParse({ DOB: formData.DOB }).success
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isValid) {
			viewSwitcherNavigate(CombinedOnboardingViews.registerUsernameForm);
		}
	};

	return (
		<OnboardingViewContainer>
			<Form onSubmit={handleSubmit} className="justify-between h-full">
				<div className="flex flex-col gap-2 mt-12">
					<h1 className="text-2xl font-semibold select-none">Choose your Date of Birth</h1>
					{/* <DOB /> */}
					Date of birth currently work in progress
				</div>
				<div className="flex w-full justify-center gap-4">
					<Button
						size="lg"
						rounded="full"
						variant="link"
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerUsernameForm)}
						aria-label="next"
					>
						Skip
					</Button>
					<Button
						size="lg"
						rounded="full"
						variant="accent"
						disabled={!!isValid}
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerUsernameForm)}
						aria-label="next"
					>
						Next
					</Button>
				</div>
			</Form>
		</OnboardingViewContainer>
	);
}
