import { forwardRef, HTMLAttributes } from "react";
import { Link, LinkProps } from "@tanstack/react-router";

export type LibraryLinkProps = LinkProps & {
	libraryId: string;
	text?: string;
};

export const LibraryLink = forwardRef<
	HTMLAnchorElement,
	HTMLAttributes<HTMLAnchorElement> & LibraryLinkProps
>(({ libraryId, className, children, text, ...props }, ref) => {
	return (
		<Link
			to="/libraries/$libraryId"
			params={{ libraryId: libraryId }}
			ref={ref}
			className={className}
			{...props}
		>
			{children ? children : text ? text : null}
		</Link>
	);
});
LibraryLink.displayName = "link";
