import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown";
import Icon from "@/shared/components/ui/icon";
import { cloneElement, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useLibrariesSettingsStore } from "@/features/libraries/librariesSettingsStore";
import type {
	LibrariesSortOption,
	LibrariesSortDirection,
	LibrariesLayoutOption,
} from "@/features/libraries/types";
import { cn } from "@/shared/lib/globalUtils";
import RenderList from "@/shared/components/utils/renderList";

const SORT_OPTIONS: { label: string; value: LibrariesSortOption }[] = [
	{ label: "Date", value: "date" },
	{ label: "Alphabetical", value: "alphabetical" },
	{ label: "Most (books)", value: "most" },
	{ label: "Least (books)", value: "least" },
];

const DIRECTION_OPTIONS: { label: string; value: LibrariesSortDirection }[] = [
	{ label: "Ascending", value: "asc" },
	{ label: "Descending", value: "desc" },
];

const LAYOUT_OPTIONS: { icon: JSX.Element; value: LibrariesLayoutOption }[] = [
	{ icon: <Icon.grid />, value: "grid" },
	{ icon: <Icon.gridCompact />, value: "gridCompact" },
	{ icon: <Icon.menu />, value: "list" },
	{ icon: <Icon.menuCompact />, value: "listCompact" },
];

export default function LibrariesSettings() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const [open, setOpen] = useState(false);
	const focusRef = useRef<HTMLDivElement | null>(null);
	const { settings, setSettings } = useLibrariesSettingsStore();

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

	const renderDirectionItems = () =>
		DIRECTION_OPTIONS.map(({ label, value }) => (
			<DropdownMenuItem key={value} onClick={() => setSettings({ direction: value })}>
				<span className="flex justify-between w-full">
					{label}
					{settings.direction === value && <Icon.check className="ml-2" />}
				</span>
			</DropdownMenuItem>
		));

	const renderLayoutIcons = () =>
		LAYOUT_OPTIONS.map(({ icon, value }) => (
			<div
				key={value}
				className={cn("group cursor-pointer", settings.layout === value ? "fill-muted" : "")}
				onClick={() => setSettings({ layout: value })}
			>
				{cloneElement(icon, {
					className: cn(
						"transition-colors",
						settings.layout === value ? "fill-accent" : "group-hover:fill-accent fill-muted/60"
					),
				})}
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
					<DropdownMenuContent className="w-48" shouldCloseOnClick={false}>
						<DropdownMenuLabel>Sort</DropdownMenuLabel>
						{renderSortItems()}
						<DropdownMenuLabel>Direction</DropdownMenuLabel>
						{renderDirectionItems()}
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
						snapPoints={({ maxHeight }) => [maxHeight / 2]}
						defaultSnap={({ snapPoints }) => snapPoints[0]}
						scrollLocking={true}
						header={
							<div className="w-full text-start">
								<h1 className="text-normal font-bold">Library Options</h1>
							</div>
						}
						expandOnContentDrag={false}
					>
						<div className="flex flex-col px-4 text-normal mt-1">
							<h1 className="text-muted text-sm py-1">Sort by</h1>
							<RenderList
								data={SORT_OPTIONS}
								render={(item) => (
									<div
										className="w-full py-1 rounded-md group flex justify-between"
										onClick={() => setSettings({ sort: item.value })}
									>
										<h1
											className={cn(
												"group-hover:text-muted",
												settings.sort === item.value
													? "text-accent group-hover:text-accent-hover"
													: ""
											)}
										>
											{item.label}
										</h1>
										{settings.sort === item.value && (
											<Icon.check className="group-hover:fill-accent-hover fill-accent" />
										)}
									</div>
								)}
							/>
							<h1 className="text-muted text-sm py-1">Direction</h1>
							<RenderList
								data={DIRECTION_OPTIONS}
								render={(item) => (
									<div
										key={item.value}
										className="w-full py-1 rounded-md group flex justify-between"
										onClick={() => setSettings({ direction: item.value })}
									>
										<h1
											className={cn(
												"group-hover:text-muted",
												settings.direction === item.value
													? "text-accent group-hover:text-accent-hover"
													: ""
											)}
										>
											{item.label}
										</h1>
										{settings.direction === item.value && (
											<Icon.check className="group-hover:fill-accent-hover fill-accent" />
										)}
									</div>
								)}
							/>
						</div>
						<div className="flex flex-col px-4 text-normal mt-1">
							<h1 className="text-muted text-sm py-1">Layout</h1>
							<div className="w-full py-1 rounded-md flex gap-2">{renderLayoutIcons()}</div>
						</div>
						<div className="mt-auto px-4 h-full pt-6">
							<p className="text-xs text-faint font-semibold">Global library options are local</p>
						</div>
					</BottomSheet>
				</>
			)}
		</>
	);
}
