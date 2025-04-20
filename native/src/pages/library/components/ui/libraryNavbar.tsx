import { useLibraryProvider } from "@/features/library/libraryProvider";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown";
import Icon from "@/shared/components/ui/icon";
import { cn } from "@/shared/lib/globalUtils";
import { useHistoryStore } from "@/shared/stores/historyStore";
import { useNavigate } from "@tanstack/react-router";
import LibrarySettings from "./librarySettings";

type LibraryNavbarProps = {
	isScrolled: boolean;
};

export default function LibraryNavbar({ isScrolled }: LibraryNavbarProps) {
	const { library } = useLibraryProvider();
	const navigate = useNavigate();

	const { goBack, currentIndex } = useHistoryStore();
	const canGoBack = currentIndex > 0;

	return (
		<div className="sticky top-0 z-1 w-full bg-transparent">
			<div className="flex w-full h-16 items-center px-4 justify-between">
				<div className="flex h-full items-center overflow-hidden">
					<div
						onClick={() => {
							canGoBack ? goBack() : navigate({ to: "/libraries" });
						}}
						className="p-3 -ml-3 cursor-pointer"
					>
						<Icon.leftArrowAlt />
					</div>
					<span className="font-bold select-none flex-grow truncate">{library?.name}</span>
				</div>
				<div className="flex flex-col">
					<div className={cn("flex", isScrolled ? "" : "")}>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<div className="p-2 cursor-pointer">
									<Icon.menu />
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-42" shouldCloseOnClick={false}>
								<DropdownMenuLabel>Options</DropdownMenuLabel>
								<DropdownMenuItem onClick={() => console.log("clicked thing one.")}>
									thing 1
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => console.log("clicked thing two.")}>
									thing 2
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<div>Logout</div>
									<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<LibrarySettings />
					</div>
				</div>
			</div>
		</div>
	);
}
