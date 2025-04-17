import { useLibraryProvider } from "@/features/libraries/libraryProvider";
import Icon from "@/shared/components/ui/icon";
import { cn } from "@/shared/lib/globalUtils";
import { useHistoryStore } from "@/shared/stores/historyStore";
import { useNavigate } from "@tanstack/react-router";

type LibraryNavbarProps = {
	isScrolled: boolean;
};

export default function LibraryNavbar({ isScrolled }: LibraryNavbarProps) {
	const { library } = useLibraryProvider();
	const navigate = useNavigate();

	const { goBack, currentIndex } = useHistoryStore();

	const canGoBack = currentIndex > 0;

	return (
		<div className="sticky top-0 z-20 w-full bg-transparent">
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
						<div className="p-2 cursor-pointer">
							<Icon.cog />
						</div>
						<div className="p-2 cursor-pointer">
							<Icon.bell />
						</div>
						<div className="p-2 -mr-2 cursor-pointer">
							<Icon.cog />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
