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
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useLibrarySettingsStore } from "@/features/library/librarySettingsStore";
import type { LibraryLayoutOption, LibrarySortOption } from "@/features/library/types";
import { cn } from "@/shared/lib/globalUtils";

const SORT_OPTIONS: { label: string; value: LibrarySortOption }[] = [
	{ label: "Custom order", value: "custom" },
	{ label: "Title", value: "title" },
	{ label: "Chapters", value: "chapters" },
	{ label: "Recently added", value: "recentlyAdded" },
	{ label: "External", value: "external" },
];

const LAYOUT_OPTIONS: { icon: JSX.Element; value: LibraryLayoutOption }[] = [
	{ icon: <Icon.grid />, value: "grid" },
	{ icon: <Icon.gridCompact />, value: "gridCompact" },
	{ icon: <Icon.menu />, value: "list" },
	{ icon: <Icon.menuCompact />, value: "listCompact" },
];

export default function LibrarySettings() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const [open, setOpen] = useState<boolean>(false);
	const focusRef = useRef<HTMLDivElement | null>(null);
	const { settings, setSettings } = useLibrarySettingsStore();

	useEffect(() => {
		focusRef.current?.focus();
	}, [focusRef]);

	const renderSortItems = () =>
		SORT_OPTIONS.map(({ label, value }) => (
			<DropdownMenuItem key={value} onClick={() => setSettings({ sort: value })}>
				<span className="flex justify-between w-full">
					{label}
					{settings.sort === value && <Icon.check className="ml-2" />}
				</span>
			</DropdownMenuItem>
		));

	const renderLayoutIcons = () =>
		LAYOUT_OPTIONS.map(({ icon, value }) => (
			<div
				key={value}
				className={cn("cursor-pointer", settings.layout === value ? "fill-muted" : "")}
				onClick={() => setSettings({ layout: value })}
			>
				{icon}
			</div>
		));

	return (
		<>
			{!isMobile ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className="p-2 cursor-pointer">
							<Icon.filter className="hover:fill-muted" />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-42" shouldCloseOnClick={false}>
						<DropdownMenuLabel>Sort</DropdownMenuLabel>
						{renderSortItems()}
						<DropdownMenuSeparator />
						<DropdownMenuLabel>Layout</DropdownMenuLabel>
						<DropdownMenuItem className="flex justify-between gap-2">
							{renderLayoutIcons()}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<>
					<div className="p-2 cursor-pointer" onClick={() => setOpen((prev) => !prev)} ref={focusRef}>
						<Icon.filter className="hover:fill-muted" />
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
						expandOnContentDrag={false}
					>
						<div className="flex flex-col px-4 text-normal mt-1">
							<h1 className="text-muted text-sm py-1">Sort by</h1>
							{SORT_OPTIONS.map(({ label, value }) => (
								<div
									key={value}
									className="w-full py-1 rounded-md group flex justify-between"
									onClick={() => setSettings({ sort: value })}
								>
									<h1
										className={cn(
											"group-hover:text-muted",
											settings.sort === value ? "text-accent group-hover:text-accent-hover" : ""
										)}
									>
										{label}
									</h1>
									{settings.sort === value && (
										<Icon.check className="group-hover:fill-accent-hover fill-accent" />
									)}
								</div>
							))}
						</div>
						<div className="flex flex-col px-1 text-normal mt-1">
							<h1 className="text-muted text-sm px-3 py-1">Layout</h1>
							<div className="px-3 w-full py-1 rounded-md flex gap-2">{renderLayoutIcons()}</div>
						</div>
						<div className="mt-auto px-4 h-full pt-6">
							<p className="text-xs text-faint font-semibold">Settings are local</p>
						</div>
					</BottomSheet>
				</>
			)}
		</>
	);
}
