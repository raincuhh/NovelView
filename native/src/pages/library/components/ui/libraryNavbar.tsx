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
import useModalStore from "@/features/modal/modalStore";
import { type Modal as ModalType } from "@/features/modal/types";

type LibraryNavbarProps = {
	isScrolled: boolean;
};

export default function LibraryNavbar({ isScrolled }: LibraryNavbarProps) {
	const { library } = useLibraryProvider();
	const navigate = useNavigate();

	const { goBack, currentIndex } = useHistoryStore();
	const canGoBack = currentIndex > 0;

	const { openModal, closeModal } = useModalStore();

	const handleOpenImportModal = () => {
		const modal: ModalType = {
			id: "import-book",
			closable: true,
			content: <>yokoso</>,
		};

		openModal(modal);
	};

	return (
		<div
			className={cn(
				"sticky top-0 z-1 w-full bg-transparent transition-colors ease-in-out duration-200",
				isScrolled ? "bg-primary" : ""
			)}
		>
			<div className="flex w-full h-14 items-center px-4 justify-between">
				<div className="flex h-full items-center overflow-hidden">
					<div
						onClick={() => {
							canGoBack ? goBack() : navigate({ to: "/home" });
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
									<Icon.menu className="hover:fill-muted" />
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
						<div className="p-2 ml-2 gap-1" onClick={handleOpenImportModal}>
							<Icon.plus className="hover:fill-muted" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
