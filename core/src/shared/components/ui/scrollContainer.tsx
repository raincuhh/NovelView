import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import { forwardRef, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/globalUtils";

export type ScrollContainerProps = {
	onScrollStart?: () => void;
	onScrollStop?: () => void;
	onCustomScroll?: (scrollTop: number) => void;
};

const ScrollContainer = forwardRef<
	OverlayScrollbarsComponentRef,
	HTMLAttributes<HTMLDivElement> & ScrollContainerProps
>(({ children, className, onScrollStart, onScrollStop, onCustomScroll, ...rest }, ref) => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [scrolling, setScrolling] = useState(false);
	const osRef = useRef<OverlayScrollbarsComponentRef | null>(null);

	const handleScroll = () => {
		const instance = osRef.current?.osInstance();
		const scrollEl = instance?.elements().viewport;

		const scrollTop = scrollEl?.scrollTop ?? 0;
		onCustomScroll?.(scrollTop);
		// console.log("scrolltop: ", scrollTop);

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
			ref={(instance) => {
				if (typeof ref === "function") ref(instance);
				else if (ref) (ref as any).current = instance;
				osRef.current = instance;
			}}
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
});

ScrollContainer.displayName = "ScrollContainer";
export default ScrollContainer;
