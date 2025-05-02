// @ts-ignore
import MobileNavigationRecentRead from "./mobileRecentRead";
import MobileNavigationButtons from "./mobileNavigationButtons";
// @ts-ignore
import { FileRouteTypes } from "@/routeTree.gen";
import SyncStatusBanner from "@/shared/components/ui/syncStatusBanner";

export default function MobileNavigation() {
	return (
		<div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end items-center h-48 pointer-events-none">
			<div
				className="absolute inset-0 z-0 pointer-events-none"
				style={{
					WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
					maskImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
					backgroundColor: "black",
				}}
			/>

			<div className="relative w-full flex flex-col pointer-events-auto">
				{/* <MobileNavigationRecentRead to={"/home" as FileRouteTypes["to"]} /> */}
				<SyncStatusBanner />
				<MobileNavigationButtons />
			</div>
		</div>
	);
}
