import { cn } from "@/shared/lib/globalUtils";
import { HTMLAttributes, PropsWithChildren, forwardRef } from "react";

type ModalProps = PropsWithChildren<{
	closable?: boolean;
}>;

const Modal = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & ModalProps>(
	({ className, children, closable, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"flex flex-col bg-primary-alt px-4 py-4 rounded-md border border-border mx-4",
					className
				)}
				{...props}
			>
				{children}
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
				className={cn("text-normal select-none text-xl font-bold mb-2", className)}
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
			<div ref={ref} className={cn("text-normal select-none text-lg", className)} {...props}>
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
				className={cn("flex flex-row w-full gap-2 mt-4 items-center justify-end", className)}
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
