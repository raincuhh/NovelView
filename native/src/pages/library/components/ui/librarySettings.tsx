// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuShortcut,
// 	DropdownMenuTrigger,
// } from "@/shared/components/ui/dropdown";
import Icon from "@/shared/components/ui/icon";
import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

export default function LibrarySettings() {
	const [open, setOpen] = useState<boolean>(false);
	const focusRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		focusRef.current?.focus();
	}, []);

	return (
		<>
			<div className="p-2 -mr-2 cursor-pointer" onClick={() => setOpen((prev) => !prev)} ref={focusRef}>
				<Icon.cog />
			</div>
			<BottomSheet
				open={open}
				onDismiss={() => setOpen(false)}
				className="default-bottom-sheet"
				snapPoints={({ maxHeight }: { maxHeight: number }) => [maxHeight / 2, maxHeight * 0.92]}
				defaultSnap={({ snapPoints }) => snapPoints[0]}
			>
				<p className="p-4 text-normal">bottom sheet as sidebar.</p>
			</BottomSheet>
		</>
	);
}
