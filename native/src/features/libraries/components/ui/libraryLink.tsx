import { forwardRef, HTMLAttributes } from "react";
import { Link, LinkProps } from "@tanstack/react-router";
import { useHistoryStore } from "@/shared/stores/historyStore";

export type LibraryLinkProps = LinkProps & {
	libraryId: string;
	text?: string;
};

export const LibraryLink = forwardRef<
	HTMLAnchorElement,
	HTMLAttributes<HTMLAnchorElement> & LibraryLinkProps
>(({ libraryId, className, children, text, ...props }, ref) => {
	const navigateTo = useHistoryStore((s) => s.navigateTo);

	return (
		<Link
			to="/libraries/$libraryId"
			params={{ libraryId: libraryId }}
			ref={ref}
			onClick={() => navigateTo(`/libraries/${libraryId}`)}
			className={className}
			{...props}
		>
			{children ? children : text ? text : null}
		</Link>
	);
});
LibraryLink.displayName = "link";
