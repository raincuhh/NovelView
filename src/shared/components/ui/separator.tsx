import React, { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

type SeparatorProps = {
	orientation?: "vertical" | "horizontal";
};

const Separator = forwardRef<HTMLDivElement, InputHTMLAttributes<HTMLDivElement> & SeparatorProps>(
	({ className, orientation = "horizontal", ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"border-solid border-border",
					orientation === "horizontal" ? "border-b w-full" : "border-l h-full",
					className
				)}
				{...props}
			/>
		);
	}
);

Separator.displayName = "Separator";

export default Separator;
