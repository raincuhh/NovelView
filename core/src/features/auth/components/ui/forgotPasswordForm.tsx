import OnboardingViewContainer from "@/pages/onboarding/components/ui/onboardingViewContainer";
import { Button } from "@/shared/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import React, { useState } from "react";

export default function ForgotPasswordForm() {
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		console.log(value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
								// value={formData.email ?? ""}
							/>
						</FormControl>
						<FormDescription>
							Type your email and we'll send you a link to reset your password.
						</FormDescription>
						<FormMessage error={error} />
					</FormItem>
				</div>
				<div className="flex w-full justify-center">
					<Button size="lg" rounded="full" variant="accent" aria-label="next">
						Send Reset Email
					</Button>
				</div>
			</Form>
		</OnboardingViewContainer>
	);
}
