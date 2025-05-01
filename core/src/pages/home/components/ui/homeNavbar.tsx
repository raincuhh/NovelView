import { useDrawerStore } from "@/features/drawer/drawerStore";
import Avatar from "@/features/user/components/ui/avatar";
import WelcomeUserMessage from "@/pages/home/components/ui/welcomeUserMessage";
import { useMediaQuery } from "react-responsive";

export default function HomeNavbar() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const { openDrawer } = useDrawerStore();

	return (
		<div className="sticky top-0 z-1 w-full border-none border-border md:border-none">
			<div className="flex px-4 py-3 gap-4 h-full w-full relative items-center bg-primary md:bg-primary-alt">
				{isMobile && <Avatar className="w-9 h-9" onClick={() => openDrawer("profile")} />}
				<div className="flex items-center text-xl h-full">
					<WelcomeUserMessage className="font-bold" />
				</div>
			</div>
			{/* <div className="relative">
				<div className="absolute inset-0 bg-primary/80 backdrop-blur-md z-[-1]"></div>
				<div className="flex px-4 py-3 gap-4 h-full w-full relative items-center">
					{isMobile && <Avatar className="w-9 h-9" onClick={() => openDrawer("profile")} />}
					<div className="flex items-center text-xl h-full">
						<WelcomeUserMessage className="font-bold" />
					</div>
				</div>
			</div> */}
		</div>
	);
}
