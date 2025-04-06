import React, { forwardRef, LabelHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const labelVariants = cva(
	"text-sm text-normal font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = forwardRef<
	HTMLLabelElement,
	LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
	<label ref={ref} className={cn(labelVariants(), className)} {...props} />
));

Label.displayName = "Label";

export default Label;
