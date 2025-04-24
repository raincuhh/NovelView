import { forwardRef, HTMLAttributes, LabelHTMLAttributes } from "react";
import Label from "./label";
import { cn } from "@/shared/lib/globalUtils";

const Form = forwardRef<HTMLFormElement, HTMLAttributes<HTMLFormElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<form ref={ref} className={cn("flex flex-col justify-start gap-4", className)} {...props}>
				{children}
			</form>
		);
	}
);
Form.displayName = "Form";

type FormLabelProps = {
	error?: string | any;
};

const FormLabel = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement> & FormLabelProps>(
	({ className, error, htmlFor, ...props }, ref) => {
		return (
			<Label
				ref={ref}
				className={cn(error && "text-danger", "select-none", className)}
				htmlFor={htmlFor}
				{...props}
			/>
		);
	}
);
FormLabel.displayName = "FormLabel";

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
				{children}
			</div>
		);
	}
);
FormItem.displayName = "FormItem";

const FormControl = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("flex items-center", className)} {...props}>
				{children}
			</div>
		);
	}
);
FormControl.displayName = "FormControl";

type FormDescriptionProps = {};

const FormDescription = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement> & FormDescriptionProps
>(({ className, children, ...props }, ref) => {
	return (
		<p ref={ref} className={cn("text-muted text-sm select-none", className)} {...props}>
			{children}
		</p>
	);
});
FormDescription.displayName = "FormDescription";

export type FormMessageProps = {
	error?: string | null;
};

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement> & FormMessageProps>(
	({ className, children, error, ...props }, ref) => {
		const body = error ? error : children;

		if (!body) {
			return null;
		}

		return (
			<p ref={ref} className={cn("text-sm font-medium text-danger", className)} {...props}>
				{body}
			</p>
		);
	}
);
FormMessage.displayName = "FormMessage";

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage };
