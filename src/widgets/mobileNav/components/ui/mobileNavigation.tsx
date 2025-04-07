import MobileNavigationRecentRead from "./mobileRecentRead";
import MobileNavigationButtons from "./mobileNavigationButtons";

export default function MobileNavigation() {
	return (
		<div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-center items-center">
			<div
				className="absolute inset-0 z-0"
				style={{
					WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
					maskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
					backgroundColor: "black",
				}}
			/>

			<div className="relative z-10 w-full">
				<MobileNavigationRecentRead />
				<MobileNavigationButtons />
			</div>
		</div>
	);
}
