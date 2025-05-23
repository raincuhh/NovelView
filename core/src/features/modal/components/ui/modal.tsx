import { cn } from "@/shared/lib/globalUtils";
import { HTMLAttributes, forwardRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
	innerClassName?: string;
	onClose: () => void;
};

const Modal = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & ModalProps>(
	({ className, innerClassName, children, onClose, ...props }, ref) => {
		useEffect(() => {
			const handler = (e: KeyboardEvent) => {
				if (e.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handler);
			return () => document.removeEventListener("keydown", handler);
		}, [onClose]);

		return (
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="absolute inset-0 bg-primary/50 z-40 w-full h-full"
				></motion.div>
				<motion.div
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 6 }}
					transition={{ duration: 0.2, ease: "easeInOut" }}
					className="absolute flex justify-center items-center z-41 h-full w-full"
				>
					<div
						ref={ref}
						className={cn(
							"bg-primary-alt p-4 rounded-md border border-border mx-4 pointer-events-none",
							className
						)}
						onClick={(e) => e.stopPropagation()}
						{...props}
					>
						<div className={cn("flex flex-col pointer-events-auto text-normal", innerClassName)}>
							{children}
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
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
