import React, { useState } from "react";
import { baseRegisterFormSchema, useRegisterFormStore } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import OnboardingViewContainer from "./onboardingViewContainer";
import {
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
	Form,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

const RegisterPasswordSchema = baseRegisterFormSchema.pick({
	password: true,
	repeatPassword: true,
});

export default function RegisterPasswordForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const [password, setPassword] = useState<string>(formData.password);
	const [repeatPassword, setRepeatPassword] = useState<string>(formData.repeatPassword);
	const [errors, setErrors] = useState<Partial<Record<"password" | "repeatPassword", string>>>({});
	const [isValid, setIsValid] = useState<boolean>(false);

	const validate = (pwd: string, repeat: string) => {
		const result = RegisterPasswordSchema.safeParse({ password: pwd, repeatPassword: repeat });
		const errorMessages: Partial<Record<"password" | "repeatPassword", string>> = {};

		if (!result.success) {
			result.error.errors.forEach((err) => {
				errorMessages[err.path[0] as "password" | "repeatPassword"] = err.message;
			});
		}
		if (pwd !== repeat) {
			errorMessages.repeatPassword = "Passwords do not match";
		}

		setErrors(errorMessages);
		setIsValid(Object.keys(errorMessages).length === 0);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		updateField({ password: value });
		validate(value, repeatPassword);
	};

	const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setRepeatPassword(value);
		updateField({ repeatPassword: value });
		validate(password, value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isValid) {
			viewSwitcherNavigate(CombinedOnboardingViews.registerGenderForm);
		}
	};

	return (
		<OnboardingViewContainer>
			<Form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-8 mt-12">
					<FormItem>
						<FormLabel
							id="passwordLabel"
							htmlFor="password"
							error={errors.password}
							className="text-2xl font-extrabold"
						>
							What's your password?
						</FormLabel>
						<FormControl>
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete="off"
								onChange={handlePasswordChange}
								// placeholder="Enter password"
								aria-labelledby="passwordLabel"
								value={formData.password ?? ""}
							/>
						</FormControl>
						<FormDescription>Remember your password, minimum 10 characters.</FormDescription>
						<FormMessage error={errors.password} />
					</FormItem>
					<FormItem>
						<FormLabel
							id="repeatPasswordLabel"
							htmlFor="repeatPassword"
							error={errors.repeatPassword}
							className="text-2xl font-extrabold"
						>
							Repeat your password
						</FormLabel>
						<FormControl>
							<Input
								id="repeatPassword"
								name="repeatPassword"
								type="password"
								autoComplete="off"
								onChange={handleRepeatPasswordChange}
								// placeholder="Repeat your password"
								aria-labelledby="repeatPasswordLabel"
								value={formData.repeatPassword ?? ""}
							/>
						</FormControl>
						<FormDescription>Make sure its spelled correctly.</FormDescription>
						<FormMessage error={errors.repeatPassword} />
					</FormItem>
				</div>
				<div className="flex w-full justify-center">
					<Button
						size="lg"
						rounded="full"
						variant="accent"
						disabled={!isValid}
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerGenderForm)}
						aria-label="next"
					>
						Next
					</Button>
				</div>
			</Form>
		</OnboardingViewContainer>
	);
}
