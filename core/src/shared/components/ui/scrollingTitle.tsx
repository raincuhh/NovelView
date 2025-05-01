import React, { useRef, useEffect, useState, forwardRef, MutableRefObject } from "react";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";
import { assignRef } from "@/shared/lib/globalUtils";

interface ScrollingTitleProps extends React.HTMLAttributes<HTMLDivElement> {
	text: string;
}

export const ScrollingTitle = forwardRef<HTMLDivElement, ScrollingTitleProps>(
	({ text, className, ...props }, forwardedRef) => {
		const containerRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement | null>;
		const textRef = useRef<HTMLDivElement>(null);
		const [shouldScroll, setShouldScroll] = useState(false);
		const controls = useAnimation();

		useEffect(() => {
			if (containerRef.current && textRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				const textWidth = textRef.current.scrollWidth;
				setShouldScroll(textWidth > containerWidth);
			}
		}, [text]);

		useEffect(() => {
			if (shouldScroll) {
				const animateLoop = async () => {
					while (true) {
						await controls.start({
							x: ["0%", "-100%"],
							transition: {
								duration: 15,
								ease: "linear",
								repeat: 0,
							},
						});
						controls.set({ x: "100%" });
					}
				};
				animateLoop();
			} else {
				controls.set({ x: "0%" });
			}
		}, [shouldScroll, controls]);

		return (
			<div
				ref={(node) => {
					containerRef.current = node;
					assignRef(forwardedRef, node);
				}}
				className={clsx("overflow-hidden whitespace-nowrap relative w-full", className)}
				{...props}
			>
				<motion.div ref={textRef} animate={controls} className="inline-block pr-8">
					{text}
				</motion.div>
			</div>
		);
	}
);

ScrollingTitle.displayName = "ScrollingTitle";
