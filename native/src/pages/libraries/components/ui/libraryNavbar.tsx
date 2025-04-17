import { useLibraryProvider } from "@/features/libraries/libraryProvider";
import Icon from "@/shared/components/ui/icon";
import { useHistoryStore } from "@/shared/stores/historyStore";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function LibraryNavbar() {
	const { library } = useLibraryProvider();
	const navigate = useNavigate();
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const { goBack, currentIndex } = useHistoryStore();

	const canGoBack = currentIndex > 0;

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 400);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="sticky top-0 z-20 w-full bg-transparent">
			<div className="flex w-full h-16 items-center px-4 gap-4">
				<div
					onClick={() => {
						canGoBack ? goBack() : navigate({ to: "/libraries" });
					}}
					className=""
				>
					<Icon.leftArrowAlt />
				</div>
				<span>{library?.name}</span>
			</div>
		</div>
	);
}
