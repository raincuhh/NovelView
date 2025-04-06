import React, { useState } from "react";
import { useRegisterFormStore, registerFormSchema } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import {
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
	Form,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import OnboardingViewContainer from "./onboardingViewContainer";

const registerEmailSchema = registerFormSchema.pick({
	email: true,
});

export default function RegisterEmailForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const [error, setError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState<boolean>(
		registerEmailSchema.safeParse({ email: formData.email }).success
	);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		updateField({ email: value });

		const result = registerEmailSchema.safeParse({ email: value });
		setError(result.success ? null : result.error.errors[0]?.message);
		setIsValid(result.success);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isValid) {
			viewSwitcherNavigate(CombinedOnboardingViews.registerPasswordForm);
		}
	};

	return (
		<OnboardingViewContainer>
			<Form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-8 mt-12">
					<FormItem>
						<FormLabel
							id="emailLabel"
							htmlFor="email"
							error={error}
							className="text-2xl font-extrabold"
						>
							What's your email address?
						</FormLabel>
						<FormControl>
							<Input
								id="email"
								name="email"
								type="email"
								autoComplete="on"
								onChange={handleEmailChange}
								aria-labelledby="emailLabel"
								value={formData.email ?? ""}
							/>
						</FormControl>
						<FormDescription>You will need to verify this email later.</FormDescription>
						<FormMessage error={error} />
					</FormItem>
				</div>
				<div className="flex w-full justify-center">
					<Button
						size="lg"
						rounded="full"
						variant="accent"
						disabled={!isValid}
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerPasswordForm)}
						aria-label="next"
					>
						Next
					</Button>
				</div>
			</Form>
		</OnboardingViewContainer>
	);
}
