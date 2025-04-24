import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	// DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown";
import Icon from "@/shared/components/ui/icon";
import Separator from "@/shared/components/ui/separator";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BottomSheet } from "react-spring-bottom-sheet";

export default function LibraryOptions() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const [open, setOpen] = useState<boolean>(false);
	const focusRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		focusRef.current?.focus();
	}, []);

	return (
		<>
			{!isMobile ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className="p-2 cursor-pointer">
							<Icon.menu className="hover:fill-muted" />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-42" shouldCloseOnClick={false}>
						<DropdownMenuLabel>Sort</DropdownMenuLabel>
						<DropdownMenuItem>Custom Order</DropdownMenuItem>
						<DropdownMenuItem>Title</DropdownMenuItem>
						<DropdownMenuItem>Chapters</DropdownMenuItem>
						<DropdownMenuItem>Recently added</DropdownMenuItem>
						<DropdownMenuItem>External</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Layout</DropdownMenuLabel>
						<DropdownMenuItem className="flex w-full justify-between">
							<div>
								<Icon.grid />
							</div>
							<div>
								<Icon.gridCompact />
							</div>
							<div>
								<Icon.menu />
							</div>
							<div>
								<Icon.menuCompact />
							</div>
						</DropdownMenuItem>
						{/* <DropdownMenuItem>
					<div>Logout</div>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem> */}
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<>
					<div className="p-2 cursor-pointer" onClick={() => setOpen((prev) => !prev)} ref={focusRef}>
						<Icon.menu className="hover:fill-muted" />
					</div>
					<BottomSheet
						open={open}
						onDismiss={() => setOpen(false)}
						className="default-bottom-sheet"
						snapPoints={({ maxHeight }) => [maxHeight / 2.3]}
						defaultSnap={({ snapPoints }) => snapPoints[0]}
						scrollLocking={true}
						header={
							<div className="w-full text-start">
								<h1 className="text-normal font-bold">Options</h1>
							</div>
						}
					>
						<div className="flex flex-col px-1 text-normal mt-1">
							<h1 className="text-normal font-bold px-3 py-1">Sort by</h1>
							<div className="w-full py-1 px-3 rounded-md group flex justify-between">
								<h1 className="group-hover:text-muted">Custom order</h1>
								{/* <Icon.check /> */}
							</div>
							<div className="w-full py-1 px-3 rounded-md group flex justify-between">
								<h1 className="group-hover:text-muted">Title</h1>
								{/* <Icon.check /> */}
							</div>
							<div className="w-full py-1 px-3 rounded-md group flex justify-between">
								<h1 className="group-hover:text-muted">Chapters</h1>
								{/* <Icon.check /> */}
							</div>
							<div className="w-full py-1 px-3 rounded-md group flex justify-between">
								<h1 className="group-hover:text-muted">Recently added</h1>
								<Icon.check className="group-hover:fill-muted" />
							</div>
							<div className="w-full py-1 px-3 rounded-md group flex justify-between">
								<h1 className="group-hover:text-muted">External</h1>
								{/* <Icon.check /> */}
							</div>
						</div>
						<div className="flex flex-col px-1 text-normal mt-1">
							<h1 className="text-normal font-bold px-3 py-1">Layout</h1>
							<div className="px-3 w-full py-1 rounded-md flex gap-2">
								<div>
									<Icon.grid className="hover:fill-muted" />
								</div>
								<div>
									<Icon.gridCompact className="hover:fill-muted" />
								</div>
								<div>
									<Icon.menu className="hover:fill-muted" />
								</div>
								<div>
									<Icon.menuCompact className="hover:fill-muted" />
								</div>
							</div>
						</div>
					</BottomSheet>
				</>
			)}
		</>
	);
}
