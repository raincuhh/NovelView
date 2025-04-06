import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/globalUtils";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & { text?: string };

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, text, ...props }, ref) => {
	return (
		<label className={cn("flex items-center gap-2", className)}>
			<input
				ref={ref}
				type="checkbox"
				className={cn(
					"peer h-4 w-4 shrink-0 rounded-sm border border-border shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive-input-border-focus disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-interactive-accent data-[state=checked]:text-normal",
					className
				)}
				{...props}
			/>
			{text && <span className="text-muted peer-checked:text-normal select-none">{text}</span>}
		</label>
	);
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
