import Avatar from "@/shared/components/ui/avatar";
// import { Button } from "@/shared/components/ui/button";
import { useMediaQuery } from "react-responsive";

export default function HomeNavbar() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	return (
		<div className="sticky top-0 z-20 w-full bg-primary border-b border-border md:border-none">
			<div className="flex flex-col pt-12 md:pt-0 px-4 pb-2">
				<h1>
					Hello <span className="font-bold">{"RainCuh"}.</span>
				</h1>
			</div>
			<div className="flex px-4 py-4 gap-4 h-full w-full flex-nowrap max-w-full">
				{isMobile ? (
					<Avatar
						className="w-8 h-8"
						onClick={() => {
							console.log("opening sideview");
						}}
					/>
				) : null}
				<div className="flex gap-2 h-full flex-nowrap overflow-y-hidden overflow-x-scroll hide-scrollbar"></div>
			</div>
		</div>
	);
}
