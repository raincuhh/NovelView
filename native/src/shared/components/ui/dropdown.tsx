import { cn } from "@/shared/lib/globalUtils";
import {
	createContext,
	useContext,
	useRef,
	useState,
	useEffect,
	ReactNode,
	HTMLAttributes,
	ButtonHTMLAttributes,
	useCallback,
	forwardRef,
} from "react";
import Separator from "./separator";

type DropdownMenuContextProps = {
	open: boolean;
	toggle: () => void;
	close: () => void;
	triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
	contentRef: React.MutableRefObject<HTMLDivElement | null>;
	shouldCloseOnClick?: boolean;
};

const DropdownMenuContext = createContext<DropdownMenuContextProps | null>(null);

export function DropdownMenu({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState<boolean>(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const toggle = useCallback(() => setOpen((prev) => !prev), []);
	const close = useCallback(() => setOpen(false), []);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				contentRef.current &&
				!contentRef.current.contains(event.target as Node) &&
				!triggerRef.current?.contains(event.target as Node)
			) {
				close();
			}
		}
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open, close]);

	return (
		<DropdownMenuContext.Provider value={{ open, toggle, close, triggerRef, contentRef }}>
			{children}
		</DropdownMenuContext.Provider>
	);
}

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
	(props, ref) => {
		const ctx = useContext(DropdownMenuContext);
		return (
			<button
				{...props}
				ref={(node) => {
					if (!ctx) return;
					ctx.triggerRef.current = node;
					if (typeof ref === "function") ref(node);
					else if (ref) (ref as any).current = node;
				}}
				onClick={ctx?.toggle}
			>
				{props.children}
			</button>
		);
	}
);

type DropdownMenuContentProps = {
	shouldCloseOnClick?: boolean;
};

export function DropdownMenuContent({
	className,
	shouldCloseOnClick = true,
	...props
}: HTMLAttributes<HTMLDivElement> & DropdownMenuContentProps) {
	const ctx = useContext(DropdownMenuContext);
	const [positionStyles, setPositionStyles] = useState<React.CSSProperties>({});

	useEffect(() => {
		if (!ctx) return;
		ctx.shouldCloseOnClick = shouldCloseOnClick;
	}, [shouldCloseOnClick]);

	useEffect(() => {
		if (!ctx) return;
		if (!ctx.open || !ctx.triggerRef.current || !ctx.contentRef.current) return;

		const triggerRect = ctx.triggerRef.current.getBoundingClientRect();
		const contentRect = ctx.contentRef.current.getBoundingClientRect();
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		let top = triggerRect.bottom;
		let left = triggerRect.left;

		if (left + contentRect.width > windowWidth) {
			left = windowWidth - contentRect.width - 14;
		}

		if (top + contentRect.height > windowHeight) {
			top = triggerRect.top - contentRect.height;
		}

		left = Math.max(14, left);
		top = Math.max(14, top);

		setPositionStyles({
			position: "absolute",
			top: `${top}px`,
			left: `${left}px`,
		});
	}, [ctx?.open]);

	if (!ctx?.open) return null;

	return (
		<div
			ref={ctx.contentRef}
			style={{ ...positionStyles }}
			className={cn(
				"absolute select-none mt-2 w-48 bg-secondary z-100 shadow-lg border border-border rounded-md pb-1",
				className
			)}
			{...props}
		/>
	);
}

export function DropdownMenuItem({
	children,
	onClick,

	...props
}: HTMLAttributes<HTMLDivElement>) {
	const ctx = useContext(DropdownMenuContext);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		onClick?.(e);

		if (ctx?.shouldCloseOnClick) ctx?.close();
	};

	return (
		<div
			className="mx-1 py-1 hover:bg-secondary-alt cursor-pointer rounded-md"
			onClick={handleClick}
			{...props}
		>
			<div className="px-2 w-full flex items-center">{children}</div>
		</div>
	);
}

export function DropdownMenuLabel({ children }: { children: ReactNode }) {
	return <div className="px-3 py-2 text-sm text-muted">{children}</div>;
}

export function DropdownMenuSeparator() {
	return <Separator className="my-1" />;
}

export function DropdownMenuShortcut({ children }: { children: ReactNode }) {
	return <span className="ml-auto text-xs text-faint">{children}</span>;
}
