// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuShortcut,
// 	DropdownMenuTrigger,
// } from "@/shared/components/ui/dropdown";
import { useLibraryCover } from "@/features/libraries/hooks/useLibraryCover";
import { useLibraryProvider } from "@/features/library/libraryProvider";
import { Cover, CoverImage } from "@/shared/components/ui/cover";
import Icon from "@/shared/components/ui/icon";
import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

export default function LibrarySettings() {
	const [open, setOpen] = useState<boolean>(false);
	const focusRef = useRef<HTMLDivElement | null>(null);
	const { library } = useLibraryProvider();
	const cover = useLibraryCover(library?.id ?? "");

	const hasImage = Boolean(cover.coverPath);

	useEffect(() => {
		focusRef.current?.focus();
	}, []);

	return (
		<>
			<div className="p-2 -mr-2 cursor-pointer" onClick={() => setOpen((prev) => !prev)} ref={focusRef}>
				<Icon.cog className="hover:fill-muted" />
			</div>
			<BottomSheet
				open={open}
				onDismiss={() => setOpen(false)}
				className="default-bottom-sheet"
				snapPoints={({ maxHeight }: { maxHeight: number }) => [maxHeight / 2, maxHeight * 0.92]}
				defaultSnap={({ snapPoints }) => snapPoints[0]}
				header={
					<div className="w-full text-start flex gap-2 items-center">
						<Cover className="w-12 h-12 rounded-md ">
							{hasImage ? (
								<CoverImage src={cover.coverPath ?? ""} alt="library cover" className="rounded-md" />
							) : (
								<div className="w-full h-full bg-secondary-alt rounded-md flex justify-center items-center-safe">
									<Icon.book className="w-[50%] h-[50%] fill-faint" />
								</div>
							)}
						</Cover>
						<div className="flex flex-col justify-center h-full">
							<header className="text-lg font-bold text-normal">{library?.name}</header>
							<p className="text-sm text-muted">Local Library</p>
						</div>
					</div>
				}
			>
				<p className="p-4 text-normal">bottom sheet as sidebar.</p>
			</BottomSheet>
		</>
	);
}
