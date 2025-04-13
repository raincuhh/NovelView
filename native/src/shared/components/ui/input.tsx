import { forwardRef, ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/globalUtils";

const inputVariants = cva(
	"flex w-full !select-all text-normal transition-discrete duration-100 ease-in-out file:border-0 file:bg-transparent file:text-md file:font-medium file:text-normal placeholder:text-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-interactive-input-border-focus focus-visible:border-interactive-input-border-focus disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
	{
		variants: {
			variant: {
				default:
					"rounded-md border border-interactive-input-border hover:border-interactive-input-border-hover bg-interactive-input-bg autofill:!bg-interactive-input-bg autofill:!text-normal autofill:border-border px-4 py-2 shadow-sm",
				ghost: " bg-transparent px-0 py-1 focus-visible:ring-0",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export type InputProps = ComponentProps<"input"> & VariantProps<typeof inputVariants>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, variant, ...props }, ref) => {
	return <input ref={ref} className={cn(inputVariants({ variant }), className)} {...props} />;
});

Input.displayName = "Input";

export { Input, inputVariants };
