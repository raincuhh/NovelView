import React, { useEffect, useRef, useState } from "react";
import { useRegisterFormStore } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { Gender, GenderType } from "@/shared/lib/types";
import RenderList from "@/shared/components/utils/renderList";
import { genderEnumToFullWord } from "@/shared/lib/utils";
import OnboardingViewContainer from "./onboardingViewContainer";
import { Form } from "@/shared/components/ui/form";

export default function RegisterGenderForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const genderList: GenderType[] = Object.values(Gender).flat();
	const [isValid, setIsValid] = useState<boolean>(formData.gender !== null);

	const initialIndex = genderList.findIndex((g) => g === formData.gender);
	const [focusedIndex, setFocusedIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const switchGender = (gender: GenderType, index: number) => {
		updateField({ gender });
		setIsValid(true);
		setFocusedIndex(index);
	};

	useEffect(() => {
		buttonRefs.current[focusedIndex]?.focus();
	}, [focusedIndex]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") {
				e.preventDefault();
				setFocusedIndex((prev) => (prev + 1) % genderList.length);
			} else if (e.key === "ArrowLeft") {
				e.preventDefault();
				setFocusedIndex((prev) => (prev - 1 + genderList.length) % genderList.length);
			} else if (e.key === "Enter" && isValid) {
				viewSwitcherNavigate(CombinedOnboardingViews.registerDOBForm);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isValid, viewSwitcherNavigate]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isValid) {
			viewSwitcherNavigate(CombinedOnboardingViews.registerDOBForm);
		}
	};

	return (
		<OnboardingViewContainer>
			<Form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-2 mt-12">
					<h1 className="text-2xl font-semibold select-none">Choose your gender</h1>
					<div className="flex flex-row flex-wrap gap-2">
						<RenderList
							data={genderList}
							render={(gender: GenderType, i: number) => (
								<Button
									// type="button"
									variant={gender === formData.gender ? "accent" : "outline"}
									rounded="full"
									key={i}
									onClick={() => switchGender(gender, i)}
									tabIndex={i === focusedIndex ? 0 : -1}
									ref={(el) => {
										buttonRefs.current[i] = el;
									}}
								>
									{genderEnumToFullWord(gender)}
								</Button>
							)}
						/>
					</div>
				</div>
				{/* <div className="flex w-full justify-center">
					<Button
						size="lg"
						rounded="full"
						variant="accent"
						disabled={!isValid}
						onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerDOBForm)}
					>
						Next
					</Button>
				</div> */}
			</Form>
		</OnboardingViewContainer>
	);
}
