import { cn } from "@/shared/lib/globalUtils";
import { forwardRef, PropsWithChildren } from "react";

type MobileNavigationButtonProps = {
	label?: string;
	asChild?: boolean;
} & PropsWithChildren &
	React.HTMLAttributes<HTMLDivElement>;

const MobileNavigationButton = forwardRef<HTMLDivElement, MobileNavigationButtonProps>(
	({ className, label, asChild = false, children, ...props }, ref) => {
		const Comp = asChild ? "span" : "div";

		return (
			<Comp
				ref={ref}
				className={cn("flex flex-col gap-1 justify-center items-center min-w-14", className)}
				{...props}
			>
				{children}
				{/* {label ? <h3 className="text-xs text-muted select-none">{label}</h3> : null} */}
			</Comp>
		);
	}
);

MobileNavigationButton.displayName = "MobileNavigationButton";

export default MobileNavigationButton;
