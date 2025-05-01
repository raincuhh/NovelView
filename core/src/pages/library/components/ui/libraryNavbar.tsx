import { useLibraryProvider } from "@/features/library/libraryProvider";

import Icon from "@/shared/components/ui/icon";
import { cn } from "@/shared/lib/globalUtils";
import { useHistoryStore } from "@/shared/stores/historyStore";
import { useNavigate } from "@tanstack/react-router";
import LibraryOptions from "./libraryOptions";
import LibrarySettings from "./librarySettings";
import LibraryImport from "./libraryImport";

type LibraryNavbarProps = {
	isScrolled: boolean;
};

export default function LibraryNavbar({ isScrolled }: LibraryNavbarProps) {
	const { library } = useLibraryProvider();
	const navigate = useNavigate();

	const { goBack, currentIndex } = useHistoryStore();
	const canGoBack = currentIndex > 0;

	return (
		<div
			className={cn(
				"sticky top-0 z-1 w-full bg-transparent transition-colors ease-in-out duration-200",
				isScrolled ? "bg-primary" : ""
			)}
		>
			<div className="flex w-full h-14 items-center px-4 justify-between">
				<div className="flex h-full items-center overflow-hidden group">
					<div
						onClick={() => {
							canGoBack ? goBack() : navigate({ to: "/home" });
						}}
						className="p-3 -ml-3 cursor-pointer"
					>
						<Icon.leftArrowAlt className="group-hover:fill-muted" />
					</div>
					{isScrolled ? (
						<span className="font-bold select-none flex-grow truncate group-hover:text-muted">
							{library.name}
						</span>
					) : null}
				</div>
				<div className="flex flex-col">
					<div className={cn("flex", isScrolled ? "flex" : "hidden")}>
						<LibrarySettings />
						<LibraryOptions />
						<LibraryImport />
					</div>
				</div>
			</div>
		</div>
	);
}
