import { useDrawerStore } from "@/features/drawer/drawerStore";
import Avatar from "@/shared/components/ui/avatar";
import WelcomeUserMessage from "@/shared/components/ui/welcomeUserMessage";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";

type HomeNavbarProps = {
	isLoading: boolean;
};

export default function HomeNavbar({ isLoading }: HomeNavbarProps) {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const { openDrawer } = useDrawerStore();

	return (
		<div className="sticky top-0 z-1 w-full border-none border-border md:border-none">
			<div className="relative">
				<div className="absolute inset-0 bg-primary/80 backdrop-blur-md z-[-1]"></div>
				<div className="flex px-4 py-3 gap-4 h-full w-full relative items-center">
					{isLoading ? (
						<>
							<div className="min-w-9">
								{isMobile ? <Skeleton className="w-9 h-9" circle /> : null}
							</div>
							<div className="w-full">
								<Skeleton className="max-w-32" height={"20px"} />
							</div>
						</>
					) : (
						<>
							{isMobile ? <Avatar className="w-9 h-9" onClick={() => openDrawer("profile")} /> : null}
							<div className="flex items-center text-xl h-full">
								<WelcomeUserMessage className="font-bold" />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
