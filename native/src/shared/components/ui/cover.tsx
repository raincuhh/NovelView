import React, { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/shared/lib/globalUtils";
import Skeleton from "react-loading-skeleton";

const Cover = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("relative select-none", className)} {...props}>
				{children}
			</div>
		);
	}
);

Cover.displayName = "Cover";

const CoverImage = forwardRef<
	HTMLImageElement,
	HTMLAttributes<HTMLImageElement> & { src: string; alt: string; isLoading?: boolean }
>(({ className, src, alt, isLoading = false, ...props }, ref) => {
	return (
		<div className="relative w-full h-full">
			{isLoading ? (
				<Skeleton height="100%" width="100%" />
			) : (
				<img
					ref={ref}
					src={src}
					alt={alt}
					{...props}
					className={cn("object-cover w-full h-full rounded-sm absolute", className)}
				/>
			)}
		</div>
	);
});

CoverImage.displayName = "CoverImage";

export { Cover, CoverImage };
