import { forwardRef, ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex w-full !select-all rounded-md border border-interactive-input-border hover:border-interactive-input-border-hover bg-interactive-input-bg autofill:!bg-interactive-input-bg autofill:!text-normal autofill:border-border px-4 py-2 text-normal shadow-sm transition-discrete duration-100 ease-in-out file:border-0 file:bg-transparent file:text-md file:font-medium file:text-normal placeholder:text-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-interactive-input-border-focus focus-visible:border-interactive-input-border-focus disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});

Input.displayName = "Input";

export { Input };
