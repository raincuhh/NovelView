import Icon from "@/shared/components/ui/icon";
import MobileNavigationButton from "./mobileNavigationButton";

export default function MobileNavigationButtons() {
	return (
		<div className="flex w-full px-4 pt-2 pb-4 justify-between">
			<MobileNavigationButton label="backward">
				<Icon.chevronLeft className="h-7 w-7 fill-accent" />
			</MobileNavigationButton>
			<MobileNavigationButton label="forward">
				<Icon.chevronRight className="h-7 w-7 fill-accent" />
			</MobileNavigationButton>
			<MobileNavigationButton label="Home">
				<Icon.home className="h-7 w-7 fill-accent" />
			</MobileNavigationButton>
			<MobileNavigationButton label="Search">
				<Icon.searchHollow className="h-7 w-7 fill-accent" />
			</MobileNavigationButton>
			<MobileNavigationButton label="Libraries">
				<Icon.library className="h-7 w-7 fill-accent" />
			</MobileNavigationButton>
		</div>
	);
}
