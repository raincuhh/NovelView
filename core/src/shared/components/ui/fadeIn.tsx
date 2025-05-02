import { motion, type MotionProps } from "framer-motion";
import { useEffect, useState, type PropsWithChildren } from "react";
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
	const [hasMounted, setHasMounted] = useState<boolean>(false);

	// to ensure animation plays even if firstload, remount, rerender issues.
	useEffect(() => {
		const timeout = setTimeout(() => setHasMounted(true), 0);
		return () => clearTimeout(timeout);
	}, []);

	if (!isMobile) return <div className={className}>{children}</div>;

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: yOffset }}
			animate={hasMounted ? { opacity: 1, y: 0 } : {}}
			transition={{ delay, duration, ease: "easeInOut" }}
			layout
			{...motionProps}
		>
			{children}
		</motion.div>
	);
}
