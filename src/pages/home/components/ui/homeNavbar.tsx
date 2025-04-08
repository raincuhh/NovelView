import Avatar from "@/shared/components/ui/avatar";
import { useMediaQuery } from "react-responsive";

export default function HomeNavbar() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	return (
		<div className="overscroll-none sticky w-full z-20 top-[-0.5px] left-0 h-18 border-border border-b">
			<div className="flex px-4 py-4 overflow-x-scroll h-full w-full">
				<Avatar className="w-8 h-8" />
			</div>
		</div>
	);
}
