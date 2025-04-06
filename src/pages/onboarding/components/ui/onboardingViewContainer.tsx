import { cn } from "@/shared/lib/utils";
import React, { forwardRef, HTMLAttributes } from "react";

const OnboardingViewContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("flex flex-col justify-between py-6 px-6 lg:px-8 h-full", className)}
				{...props}
			>
				{children}
			</div>
		);
	}
);
export default OnboardingViewContainer;
