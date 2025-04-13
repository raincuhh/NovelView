import { cn } from "@/shared/lib/globalUtils";
import { HTMLAttributes, forwardRef } from "react";

type ModalProps = {
	innerClassName?: string;
};

const Modal = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & ModalProps>(
	({ className, innerClassName, children, ...props }, ref) => {
		return (
			<div
				// onClick={(e) => e.preventDefault()}
				ref={ref}
				className={cn(
					"bg-primary-alt px-4 py-6 rounded-md border border-border mx-4 pointer-events-none",
					className
				)}
				{...props}
			>
				<div className={cn("flex flex-col pointer-events-auto", innerClassName)}>{children}</div>
			</div>
		);
	}
);

Modal.displayName = "Modal";

const ModalTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, id, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("text-normal select-none text-lg font-bold mb-2", className)}
				{...props}
			>
				{children}
			</div>
		);
	}
);

ModalTitle.displayName = "ModalTitle";

const ModalSubTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("text-normal select-none text-md mb-2", className)} {...props}>
				{children}
			</div>
		);
	}
);

ModalSubTitle.displayName = "ModalSubTitle";

const ModalControl = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("flex flex-row w-full gap-4 mt-4 items-center justify-end", className)}
				{...props}
			>
				{children}
			</div>
		);
	}
);

ModalControl.displayName = "ModalControl";

const ModalDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<p ref={ref} className={cn("text-muted text-sm select-none", className)} {...props}>
				{children}
			</p>
		);
	}
);
ModalDescription.displayName = "ModalDescription";

export { Modal, ModalControl, ModalDescription, ModalTitle, ModalSubTitle };
