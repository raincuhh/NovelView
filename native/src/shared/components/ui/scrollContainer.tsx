import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import { forwardRef, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/globalUtils";

export type ScrollContainerProps = HTMLAttributes<HTMLDivElement> & {
	onScrollStart?: () => void;
	onScrollStop?: () => void;
};

const ScrollContainer = forwardRef<OverlayScrollbarsComponentRef, ScrollContainerProps>(
	({ children, className, onScrollStart, onScrollStop, ...rest }, ref) => {
		const timeoutRef = useRef<NodeJS.Timeout | null>(null);
		const [scrolling, setScrolling] = useState(false);

		const handleScroll = () => {
			if (onScrollStart && !scrolling) {
				setScrolling(true);
				onScrollStart();
			}

			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				if (onScrollStop) onScrollStop();
				setScrolling(false);
			}, 1500);
		};

		return (
			<OverlayScrollbarsComponent
				ref={ref}
				className={cn("default-scroll", className)}
				options={{
					scrollbars: {
						autoHide: "scroll",
					},
					overflow: {
						x: "hidden",
					},
				}}
				events={{ scroll: handleScroll }}
				{...rest}
			>
				{children}
			</OverlayScrollbarsComponent>
		);
	}
);

ScrollContainer.displayName = "ScrollContainer";
export default ScrollContainer;
