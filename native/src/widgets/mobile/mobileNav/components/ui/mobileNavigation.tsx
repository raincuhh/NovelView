import MobileNavigationRecentRead from "./mobileRecentRead";
import MobileNavigationButtons from "./mobileNavigationButtons";
import { FileRouteTypes } from "@/routeTree.gen";

export default function MobileNavigation() {
	return (
		<div className="absolute bottom-0 left-0 right-0 flex flex-col justify-center items-center">
			<div
				className="absolute inset-0 z-0"
				style={{
					WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 100%)",
					maskImage: "linear-gradient(to top, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 100%)",
					backgroundColor: "black",
				}}
			/>

			<div className="relative w-full flex flex-col">
				<MobileNavigationRecentRead to={"/home" as FileRouteTypes["to"]} />
				<MobileNavigationButtons />
			</div>
		</div>
	);
}
