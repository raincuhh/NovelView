import { motion, type MotionProps } from "framer-motion";
import { type PropsWithChildren } from "react";
import { useMediaQuery } from "react-responsive";

type FadeInProps = PropsWithChildren & {
	delay?: number;
	duration?: number;
	yOffset?: number;
	className?: string;
	motionProps?: MotionProps;
};

export default function FadeIn({
	children,
	delay = 0,
	duration = 0.1,
	yOffset = 6,
	className = "",
	motionProps = {},
}: FadeInProps) {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	if (!isMobile) return children;

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: yOffset }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay, duration, ease: "easeInOut" }}
			{...motionProps}
		>
			{children}
		</motion.div>
	);
}
