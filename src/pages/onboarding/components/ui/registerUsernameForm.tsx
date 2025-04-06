import React, { useState } from "react";
import OnboardingViewContainer from "./onboardingViewContainer";
import {
	Form,
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/components/ui/form";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { CombinedOnboardingViews } from "../../types";
import { registerFormSchema, useRegisterFormStore } from "../../registerFormStore";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

const registerUsernameSchema = registerFormSchema.pick({
	username: true,
});

export default function RegisterUsernameForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const [error, setError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState<boolean>(
		registerUsernameSchema.safeParse({ username: formData.username }).success
	);

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		updateField({ username: value });

		const result = registerUsernameSchema.safeParse({ username: value });
		setError(result.success ? null : result.error.errors[0]?.message);
		setIsValid(result.success);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isValid) {
			viewSwitcherNavigate(CombinedOnboardingViews.registerFinish);
		}
	};

	return (
		<OnboardingViewContainer>
			<Form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-8 mt-12">
					<FormItem>
						<FormLabel
							id="usernameLabel"
							htmlFor="username"
							error={error}
							className="text-2xl font-extrabold"
						>
							What's your username?
						</FormLabel>
						<FormControl>
							<Input
								id="username"
								name="username"
								type="username"
								autoComplete="on"
								onChange={handleUsernameChange}
								// placeholder="Enter Username"
								aria-labelledby="usernameLabel"
								value={formData.username ?? ""}
							/>
						</FormControl>
						<FormDescription>This will appear on your profile.</FormDescription>
						<FormMessage error={error} />
					</FormItem>
				</div>
				<div className="flex w-full justify-center">
					<Button
						size="lg"
						rounded="full"
						variant="accent"
						disabled={!isValid}
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerFinish)}
						aria-label="next"
					>
						Next
					</Button>
				</div>
			</Form>
		</OnboardingViewContainer>
	);
}
