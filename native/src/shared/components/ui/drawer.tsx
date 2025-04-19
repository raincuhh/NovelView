import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/shared/lib/globalUtils";
import { useDrag } from "@use-gesture/react";
import { useEffect, forwardRef, PropsWithChildren, ReactNode, HTMLAttributes } from "react";

type DrawerSide = "left" | "right";

type DrawerProps = {
	side: DrawerSide;
	isOpen: boolean;
	onClose: () => void;
	width?: number;
	children: ReactNode;
};

export const Drawer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & DrawerProps>(
	({ children, side, isOpen, onClose, width = 300, ...props }, ref) => {
		const x = useMotionValue(side === "right" ? width : -width);
		const overlayBackgroundOpacity = useTransform(x, [-width, 0, width], [0, 1, 0]);

		useEffect(() => {
			if (isOpen) {
				animate(x, 0, { type: "spring", damping: 30, stiffness: 300 });
			} else {
				animate(x, side === "right" ? width : -width, { type: "spring", damping: 30, stiffness: 300 });
			}
		}, [isOpen]);

		return (
			<>
				<motion.div
					style={{
						opacity: overlayBackgroundOpacity,
						pointerEvents: isOpen ? "auto" : "none",
					}}
					className="fixed inset-0 bg-black bg-primary/50 z-40"
					onClick={onClose}
				/>
				<motion.div
					style={{
						x,
						width,
						[side]: 0,
					}}
					className="fixed top-0 bottom-0 bg-secondary shadow-lg z-50"
				>
					{children}
				</motion.div>
			</>
		);
	}
);
