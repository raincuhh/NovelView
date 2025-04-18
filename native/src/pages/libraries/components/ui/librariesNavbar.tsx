import Avatar from "@/shared/components/ui/avatar";
import { useMediaQuery } from "react-responsive";

export default function LibrariesNavbar() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	return (
		<div className="sticky top-0 z-20 w-full border-none border-border md:border-none">
			<div className="relative">
				<div className="absolute inset-0 bg-primary/80 backdrop-blur-md z-[-1]"></div>

				<div className="flex px-4 py-3 gap-4 h-full w-full flex-nowrap max-w-full relative z-10">
					{isMobile ? (
						<Avatar
							className="w-9 h-9"
							onClick={() => {
								console.log("opening sideview");
							}}
						/>
					) : null}
					<div className="flex h-full items-center">
						<h1 className="font-bold text-lg">Your Libraries</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
