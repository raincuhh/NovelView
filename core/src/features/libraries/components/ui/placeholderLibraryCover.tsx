import Icon from "@/shared/components/ui/icon";
import { cn } from "@/shared/lib/globalUtils";
import { forwardRef, HTMLAttributes } from "react";

const PlaceholderLibraryCover = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
	return (
		<div
			ref={ref}
			{...props}
			className={cn("w-full h-full flex justify-center items-center bg-secondary-alt", props.className)}
		>
			<Icon.book className="fill-faint w-[50%] h-[50%]" />
		</div>
	);
});

PlaceholderLibraryCover.displayName = "PlaceholderLibraryCover";

export default PlaceholderLibraryCover;
