import Icon from "@/shared/components/ui/icon";
import MobileNavigationButton from "./mobileNavigationButton";
import { Link } from "@tanstack/react-router";

export default function MobileNavigationButtons() {
	return (
		<div className="flex w-full px-4 pt-4 pb-4 justify-between">
			<MobileNavigationButton label="back">
				<Icon.chevronLeft className="h-7 w-7 fill-accent" />
			</MobileNavigationButton>
			<MobileNavigationButton label="forward">
				<Icon.chevronRight className="h-7 w-7 fill-accent" />
			</MobileNavigationButton>
			<Link to="/home">
				<MobileNavigationButton label="Home">
					<Icon.home className="h-7 w-7 fill-accent" />
				</MobileNavigationButton>
			</Link>
			<Link to="/search">
				<MobileNavigationButton label="Search">
					<Icon.searchHollow className="h-7 w-7 fill-accent" />
				</MobileNavigationButton>
			</Link>
			<Link to="/libraries">
				<MobileNavigationButton label="Libraries">
					<Icon.library className="h-7 w-7 fill-accent" />
				</MobileNavigationButton>
			</Link>
		</div>
	);
}
