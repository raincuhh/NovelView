import { forwardRef, HTMLAttributes, useState } from "react";
import { cn } from "@/shared/lib/globalUtils";

export type SwitchProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
	(
		{ checked: controlledChecked, defaultChecked = false, onCheckedChange, disabled, className, ...props },
		ref
	) => {
		const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
		const isControlled = controlledChecked !== undefined;
		const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

		const toggle = () => {
			const newChecked = !isChecked;
			if (!isControlled) setUncontrolledChecked(newChecked);
			onCheckedChange?.(newChecked);
		};

		return (
			<button
				ref={ref}
				type="button"
				role="switch"
				aria-checked={isChecked}
				disabled={disabled}
				onClick={toggle}
				className={cn(
					"relative inline-flex h-5 w-11 shrink-0 items-center rounded-full transition-colors duration-100 ease-in-out border focus:outline-none focus:ring-1",
					isChecked ? "bg-accent" : "bg-primary-alt",
					"focus:ring-border-focus border-border focus:border-border-focus hover:border-border-hover",
					disabled && "opacity-50 cursor-not-allowed pointer-events-none",
					className
				)}
				{...props}
			>
				<span
					className={cn(
						"inline-block h-3 w-3 transform rounded-full bg-normal transition-transform",
						isChecked ? "translate-x-6" : "translate-x-1"
					)}
				/>
			</button>
		);
	}
);

Switch.displayName = "Switch";
