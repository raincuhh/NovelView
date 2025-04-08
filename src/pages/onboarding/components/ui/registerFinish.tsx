import React, { useEffect, useRef, useState } from "react";
import OnboardingViewContainer from "./onboardingViewContainer";
import { Button } from "@/shared/components/ui/button";
import ReadOnlyFormDisplay from "@/shared/components/ui/readOnlyFormDisplay";
import { Form } from "@/shared/components/ui/form";
import { Link } from "@tanstack/react-router";
import Separator from "@/shared/components/ui/separator";
import { useRegisterFormStore } from "../../registerFormStore";
import { cn } from "@/shared/lib/globalUtils";
import { db, supabase } from "@/shared/providers/systemProvider";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";

export default function RegisterFinish() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData } = useRegisterFormStore();

	const [isSticky, setIsSticky] = useState<boolean>(true);

	const containerRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => setIsSticky(!entry.isIntersecting), {
			root: containerRef.current,
			threshold: 1.0,
		});

		if (bottomRef.current) observer.observe(bottomRef.current);

		return () => {
			if (bottomRef.current) observer.unobserve(bottomRef.current);
		};
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("formData: ", formData);

		try {
			const { data, error } = await supabase.client.auth.signUp({
				email: formData.email,
				password: formData.password,
			});

			if (error) throw error;

			if (data.user) {
				const user = data.user;

				await db.writeTransaction(async (tx) => {
					tx.execute(
						`INSERT INTO profiles (
							id,
							user_id,
							username,
							gender,
							dob,
							created_at,
							updated_at,
							avatar_url
						) VALUES (uuid(), ?, ?, ?, ?, datetime(), datetime(), ?)`,
						[user.id, formData.username, formData.gender, formData.DOB, null]
					);

					tx.execute(
						`INSERT INTO user_settings (
								id,
								user_id,
								onboarding_completed,
								app_theme,
								app_accent,
								font_size,
								language,
								notifications_enabled,
								created_at,
								updated_at
						  ) VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?, datetime(), datetime())`,
						[user.id, false, "default", "", 14, "en", true]
					);
				});
			}

			viewSwitcherNavigate(CombinedOnboardingViews.registerVerifyEmail);
		} catch (err: any) {
			console.error("Register failed: ", err);
		}
	};

	return (
		<OnboardingViewContainer ref={containerRef} className="hide-scrollbar relative overflow-y-scroll">
			<Form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-8 mt-12">
					<div className="flex flex-col gap-4">
						<h1 className="text-2xl font-semibold select-none">Overview</h1>
						<ReadOnlyFormDisplay data={formData.email} label="Email" />
						<ReadOnlyFormDisplay data={formData.password} label="Password" isCensored={true} />
						<ReadOnlyFormDisplay data={formData.gender} label="Gender" />
						<ReadOnlyFormDisplay data={formData.DOB} label="Date of Birth" />
						<ReadOnlyFormDisplay data={formData.username} label="Username" />
					</div>
					<Separator />
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-6 select-none">
							<div className="flex flex-col gap-4">
								<p className="text-muted text-sm">
									By clicking 'Finalize', you agree to NovelView's Terms of Use.
								</p>
								<Link
									to="/legal/tos"
									className="text-accent hover:text-accent-hover font-bold transition-discrete duration-100 ease-in-out"
								>
									Terms of Use
								</Link>
							</div>
							<div className="flex flex-col gap-4">
								<p className="text-muted text-sm">
									To understand how we collect, use, and protect your personal information, please
									review our Privacy Policy below.
								</p>
								<Link
									to="/legal/privacy-policy"
									className="text-accent hover:text-accent-hover font-bold transition-discrete duration-100 ease-in-out"
								>
									Privacy Policy
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div
					className={cn(
						"transition-all duration-100 flex justify-center",
						isSticky ? "sticky bottom-0" : "relative"
					)}
				>
					<Button
						type="submit"
						size="lg"
						rounded="full"
						variant="accent"
						aria-label="next"
						disabled={isSticky}
					>
						Finalize
					</Button>
				</div>
			</Form>
			<div ref={bottomRef} className="h-1" />
		</OnboardingViewContainer>
	);
}
