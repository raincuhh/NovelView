import { cn } from "@/shared/lib/globalUtils";
import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";

type ModalBackgroundProps = PropsWithChildren;

const ModalBackground = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & ModalBackgroundProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn("absolute h-screen w-screen bg-primary/50 z-50 top-0 left-0", className)}
				{...props}
			>
				<div className="flex w-full h-full justify-center items-center">{children}</div>
			</div>
		);
	}
);

export default ModalBackground;
