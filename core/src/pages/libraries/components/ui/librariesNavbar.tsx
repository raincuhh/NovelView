import { useDrawerStore } from "@/features/drawer/drawerStore";
import Avatar from "@/features/user/components/ui/avatar";
import { useMediaQuery } from "react-responsive";
import LibrariesSettings from "./librariesSettings";
import LibrariesCreate from "./librariesCreate";

export default function LibrariesNavbar() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const { openDrawer } = useDrawerStore();

	return (
		<div className="top-0 z-1 w-full border-none border-border md:border-none">
			<div className="flex px-4 py-3 gap-4 h-full w-full relative items-center bg-primary md:bg-primary-alt">
				<div className="flex w-full h-full items-center gap-4">
					{isMobile && <Avatar className="w-9 h-9" onClick={() => openDrawer("profile")} />}
					<div className="flex items-center h-full">
						<h1 className="font-bold text-xl">Your libraries</h1>
					</div>
				</div>
				<div className="flex">
					<LibrariesSettings />
					<LibrariesCreate />
				</div>
			</div>
			{/* <div className="relative">
				<div className="absolute inset-0 bg-primary/80 backdrop-blur-md z-[-1]"></div>

				<div className="flex px-4 py-3 gap-4 h-full w-full relative items-center">
					{isMobile ? (
						<Avatar
							className="w-9 h-9"
							onClick={() => {
								console.log("opening sideview");
							}}
						/>
					) : null}
					<div className="flex items-center h-full">
						<h1 className="font-bold text-xl">Your libraries</h1>
					</div>
				</div>
			</div> */}
		</div>
	);
}
