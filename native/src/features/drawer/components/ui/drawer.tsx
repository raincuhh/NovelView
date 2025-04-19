import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import { useEffect, forwardRef, ReactNode, HTMLAttributes } from "react";
import { useDrawerStore } from "../../drawerStore";
import { DrawerID } from "../../types";

type DrawerSide = "left" | "right";

type DrawerProps = {
	id: DrawerID;
	side: DrawerSide;
	width?: number;
	children: ReactNode;
};

export const Drawer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & DrawerProps>(
	({ children, side, id, width = 300 }, ref) => {
		const { isOpen, closeDrawer } = useDrawerStore();
		const open = isOpen(id);

		const x = useMotionValue(side === "right" ? width : -width);
		const overlayBackgroundOpacity = useTransform(x, [-width, 0, width], [0, 1, 0]);

		useEffect(() => {
			if (open) {
				animate(x, 0, { type: "spring", damping: 30, stiffness: 300 });
			} else {
				animate(x, side === "right" ? width : -width, { type: "spring", damping: 30, stiffness: 300 });
			}
		}, [open]);

		useEffect(() => {
			const handler = (e: KeyboardEvent) => {
				if (e.key === "Escape") closeDrawer(id);
			};
			document.addEventListener("keydown", handler);
			return () => document.removeEventListener("keydown", handler);
		}, [closeDrawer, id]);

		const handleOnDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
			if (side === "left") {
				if (info.offset.x < -75) {
					closeDrawer(id);
				}
			} else {
				if (info.offset.x > 75) {
					closeDrawer(id);
				}
			}
		};

		const handleOnDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
			if (side === "left") {
				if (info.offset.x > 0) {
					x.set(0);
				}
			} else {
				if (info.offset.x < 0) {
					x.set(0);
				}
			}
		};

		return (
			<>
				<motion.div
					style={{
						opacity: overlayBackgroundOpacity,
						pointerEvents: open ? "auto" : "none",
					}}
					className="fixed inset-0 bg-black bg-primary/50 z-40"
					onClick={() => closeDrawer(id)}
				/>
				<motion.div
					ref={ref}
					style={{
						x,
						width,
						[side]: 0,
					}}
					className="fixed top-0 bottom-0 bg-secondary shadow-lg z-50"
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={0.8}
					onDragEnd={handleOnDragEnd}
					onDrag={handleOnDrag}
				>
					{children}
				</motion.div>
				{/* <div
					className="fixed top-0 bottom-0 z-50 overflow-hidden"
					style={{
						[side]: -ELASTIC_BUFFER,
						width: width + ELASTIC_BUFFER * 2,
						pointerEvents: isOpen ? "auto" : "none",
					}}
				>
					<motion.div
						style={{
							x,
							width: width + ELASTIC_BUFFER * 2,
						}}
						className="h-full bg-secondary shadow-lg"
						drag="x"
						dragElastic={0.1}
						dragConstraints={side === "left" ? { left: -width, right: 0 } : { left: 0, right: width }}
					>
						<div style={{ width }} className="h-full">
							{children}
						</div>
					</motion.div>
				</div> */}
			</>
		);
	}
);
