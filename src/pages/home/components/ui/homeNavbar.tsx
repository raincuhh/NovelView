import Avatar from "@/shared/components/ui/avatar";
// import WelcomeUserMessage from "@/shared/components/ui/welcomeUserMessage";
import { useMediaQuery } from "react-responsive";

export default function HomeNavbar() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	return (
		<div className="sticky top-0 z-20 w-full border-none border-border md:border-none">
			<div className="relative">
				<div className="absolute inset-0 bg-primary/50 backdrop-blur-md z-[-1]"></div>

				<div className="flex px-4 py-3 gap-4 h-full w-full flex-nowrap max-w-full relative z-10">
					{isMobile ? (
						<Avatar
							className="w-9 h-9"
							onClick={() => {
								console.log("opening sideview");
							}}
						/>
					) : null}
					<div className="flex gap-2 h-full flex-nowrap overflow-y-hidden overflow-x-scroll hide-scrollbar items-center justify-center">
						{/* <h1 className="font-extrabold text-2xl">Home</h1> */}
					</div>
				</div>
			</div>
		</div>
	);
}
