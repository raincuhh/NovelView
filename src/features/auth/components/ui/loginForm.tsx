import { useState } from "react";
import { z } from "zod";
import { useAuthStore } from "../../authStore";
import OnboardingViewContainer from "@/pages/onboarding/components/ui/onboardingViewContainer";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

const loginFormSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(10, "Password is at least 10 characters"),
});

export default function LoginForm() {
	const { login, user, loading } = useAuthStore();

	const [formData, setFormData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState<Partial<Record<"email" | "password", string>>>({});
	const [isValid, setIsValid] = useState<boolean>(false);

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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isValid) {
			console.log("Form submitted:", formData);
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
					</FormItem>
				</div>
				<div className="flex w-full justify-center">
					<Button
						size="lg"
						rounded="full"
						variant="accent"
						disabled={!isValid || loading}
						aria-label="next"
					>
						{loading ? "Logging in..." : "Log in"}
					</Button>
				</div>
			</Form>
		</OnboardingViewContainer>
	);
}
