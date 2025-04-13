import { forwardRef, ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/shared/lib/globalUtils";

const buttonVariants = cva(
	"inline-flex items-center select-none justify-center gap-2 whitespace-nowrap text-md font-semibold transition-discrete duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-interactive-normal hover:bg-interactive-hover",
				accent:
					"bg-interactive-accent hover:bg-interactive-accent-hover border-interactive-accent border",
				outline:
					"border border-border hover:border-border-hover hover:bg-interactive-normal/70 text-normal",
				link: "text-normal underline-offset-4 hover:underline",
				ghost: "bg-transparent hover:bg-interactive-normal/70",
				destructive:
					"bg-interactive-danger hover:bg-interactive-danger-hover border-interactive-danger border text-normal",
				warning: "",
				success: "",
			},
			size: {
				default: "px-4 py-2",
				sm: "px-3 text-xs",
				lg: "px-6 py-3",
				icon: "h-9 w-9",
			},
			rounded: {
				default: "rounded-md",
				sm: "rounded-sm",
				lg: "rounded-lg",
				full: "rounded-full",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			rounded: "default",
		},
	}
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, rounded, asChild = false, ...props }: ButtonProps, ref) => {
		const Comp = asChild ? "span" : "button";
		return (
			<Comp className={cn(buttonVariants({ variant, size, rounded, className }))} ref={ref} {...props} />
		);
	}
);

Button.displayName = "Button";

export { Button, buttonVariants };
