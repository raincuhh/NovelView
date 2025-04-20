import { useState } from "react";
import { z } from "zod";
import OnboardingViewContainer from "@/pages/onboarding/components/ui/onboardingViewContainer";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useSupabase } from "@/shared/providers/systemProvider";
import { useNavigate } from "@tanstack/react-router";
import { CombinedOnboardingViews } from "@/pages/onboarding/types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";

const loginFormSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(10, "Password is at least 10 characters"),
});

export default function LoginForm() {
	const supabase = useSupabase();
	const navigate = useNavigate();
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();

	const [formData, setFormData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState<Partial<Record<"email" | "password", string>>>({});
	const [isValid, setIsValid] = useState<boolean>(false);
	const [firstTimeForgotPassword, setFirstTimeForgotPassword] = useState<boolean>(false);

	const validate = () => {
		const result = loginFormSchema.safeParse(formData);
		if (result.success) {
			setErrors({});
			setIsValid(true);
		} else {
			const fieldErrors: Partial<Record<"email" | "password", string>> = {};
			result.error.errors.forEach((err) => {
				if (err.path[0] === "email") fieldErrors.email = err.message;
				if (err.path[0] === "password") fieldErrors.password = err.message;
			});
			setErrors(fieldErrors);
			setIsValid(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		validate();
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isValid) return;

		try {
			const session = await supabase?.login(formData.email, formData.password);
			if (!session) {
				console.error("Login returned no session");
				setErrors({
					email: "Invalid email or password. Please try again.",
				});
				return;
			}

			// const userId = session.user.id;
			// const avatarUrl = session.user.user_metadata?.avatar_url ?? "";

			// await insertNewUser(userId, avatarUrl);

			console.log("Logged in:", session);

			navigate({ to: "/home" });
		} catch (err: any) {
			console.error("Login or local setup failed:", err);
			if (err.message === "Invalid login credentials") {
				setErrors({
					email: "Invalid email or password. Please try again.",
				});
				setFirstTimeForgotPassword(true);
			} else {
				setErrors({
					email: "An unexpected error occurred. Please try again later.",
				});
				setFirstTimeForgotPassword(true);
			}
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
							error={errors.email}
							className="text-2xl font-extrabold"
						>
							What's your email?
						</FormLabel>
						<FormControl>
							<Input
								id="email"
								name="email"
								type="text"
								value={formData.email ?? ""}
								onChange={handleInputChange}
								autoComplete="off"
								aria-labelledby="emailLabel"
							/>
						</FormControl>
						<FormMessage error={errors.email} />
					</FormItem>
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
								onChange={handleInputChange}
								autoComplete="off"
								aria-labelledby="passwordLabel"
							/>
						</FormControl>
						<FormMessage error={errors.password} />
						{firstTimeForgotPassword ? (
							<span
								className="text-accent font-semibold cursor-pointer hover:underline underline-offset-2 hover:text-accent-hover"
								onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.forgotPasswordForm)}
							>
								Forgot Password?
							</span>
						) : null}
					</FormItem>
				</div>
				<div className="flex w-full justify-center">
					<Button size="lg" rounded="full" variant="accent" disabled={!isValid} aria-label="next">
						Log in
					</Button>
				</div>
			</Form>
		</OnboardingViewContainer>
	);
}
