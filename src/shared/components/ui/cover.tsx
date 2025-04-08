import { ReactNode } from "@tanstack/react-router";
import React, { forwardRef } from "react";
import { cn } from "@/shared/lib/globalUtils";

const Cover = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("relative", className)} {...props}>
				{children}
			</div>
		);
	}
);

Cover.displayName = "Cover";

const CoverImage = forwardRef<HTMLImageElement, { src: string; alt: string }>(
	({ src, alt, ...props }, ref) => {
		return (
			<img
				ref={ref}
				src={src}
				alt={alt}
				{...props}
				className="object-cover w-full h-full rounded-sm absolute"
			/>
		);
	}
);

CoverImage.displayName = "CoverImage";

interface CoverImageFallbackProps {
	children?: ReactNode;
	isLoading?: boolean;
}

const CoverImageFallback = ({ children, isLoading = true }: CoverImageFallbackProps) => {
	return (
		<div className="w-full h-full flex items-center justify-center absolute">
			{isLoading ? (
				// <Skeleton height={200} width={200} />
				<span>l...</span>
			) : (
				<span className="text-xl text-muted">{children}</span>
			)}
		</div>
	);
};

CoverImageFallback.displayName = "CoverImageFallback";

export { Cover, CoverImage, CoverImageFallback };
