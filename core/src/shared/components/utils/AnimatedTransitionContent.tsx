import { motion, AnimatePresence, Variants, VariantLabels } from "framer-motion";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { ElementType } from "react";

export const defaultVariants = {
	enter: (direction: number) => ({
		x: direction > 0 ? "120%" : "-120%",
		opacity: 0,
	}),
	center: { x: 0, opacity: 1 },
	exit: (direction: number) => ({
		x: direction < 0 ? "120%" : "-120%",
		opacity: 0,
	}),
};

type AnimatedTransitionContentProps<T extends string | number | symbol> = {
	viewComponents: Record<T, ElementType>;
	initial?: VariantLabels;
	animate?: VariantLabels;
	variants?: Variants;
};

export const AnimatedTransitionContent = <T extends string | number | symbol>({
	viewComponents,
	initial = "enter",
	animate = "center",
	variants,
}: AnimatedTransitionContentProps<T>) => {
	const { currentView, direction } = useViewTransition<T>();
	const Comp = (viewComponents[currentView as keyof typeof viewComponents] as ElementType) || null;

	if (!Comp) {
		console.error(`No component found for view: ${String(currentView)}`);
		return <div className="text-center text-danger">Error: View not found</div>;
	}

	return (
		<AnimatePresence mode="popLayout" custom={direction}>
			<motion.main
				key={currentView as string}
				custom={direction}
				initial={initial}
				animate={animate}
				exit="exit"
				variants={variants || defaultVariants}
				transition={{ duration: 0.25 }}
				className="inset-0 w-full h-full overflow-hidden relative"
			>
				{Comp && <Comp />}
			</motion.main>
		</AnimatePresence>
	);
};
