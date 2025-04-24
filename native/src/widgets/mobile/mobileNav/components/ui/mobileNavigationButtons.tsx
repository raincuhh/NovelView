import Icon from "@/shared/components/ui/icon";
import MobileNavigationButton from "./mobileNavigationButton";
import { Link, useRouter } from "@tanstack/react-router";
import { Fragment } from "react";
import RenderList from "@/shared/components/utils/renderList";
import { cn } from "@/shared/lib/globalUtils";
import { useHistoryStore } from "@/shared/stores/historyStore";

export default function MobileNavigationButtons() {
	const router = useRouter();
	const { navigateTo } = useHistoryStore();

	const buttons = [
		{
			key: "home",
			icon: (() => {
				const isActive = router.state.location.pathname === "/home";
				const IconComponent = isActive ? Icon.home : Icon.hollowHome;
				const iconClass = cn("h-7 w-7", isActive ? "fill-accent" : "fill-muted");

				return <IconComponent className={iconClass} />;
			})(),
			onclick: () => navigateTo("/home"),
			to: "/home",
		},
		// {
		// 	key: "back",
		// 	icon: <Icon.chevronLeft className={cn("h-7 w-7", canGoBack ? "fill-accent" : "fill-faint")} />,
		// 	onclick: goBack,
		// },
		// {
		// 	key: "forward",
		// 	icon: <Icon.chevronRight className={cn("h-7 w-7", canGoForward ? "fill-accent" : "fill-faint")} />,
		// 	onclick: goForward,
		// },
		{
			key: "browse",
			icon: (() => {
				const isActive = router.state.location.pathname === "/browse";
				const IconComponent = isActive ? Icon.compassFilled : Icon.compass;
				const iconClass = cn("h-7 w-7", isActive ? "fill-accent" : "fill-muted");

				return <IconComponent className={iconClass} />;
			})(),
			onclick: () => navigateTo("/browse"),
			to: "/browse",
		},
		{
			key: "search",
			icon: (() => {
				const isActive = router.state.location.pathname === "/search";
				const IconComponent = isActive ? Icon.searchFilled : Icon.searchHollow;
				const iconClass = cn("h-7 w-7", isActive ? "fill-accent" : "fill-muted");

				return <IconComponent className={iconClass} />;
			})(),
			onclick: () => navigateTo("/search"),
			to: "/search",
		},
		{
			key: "libraries",
			icon: (
				<Icon.library
					className={cn(
						"h-7 w-7",
						router.state.location.pathname === "/libraries" ? "fill-accent" : "fill-muted"
					)}
				/>
			),
			onclick: () => navigateTo("/libraries"),
			to: "/libraries",
		},
	];

	return (
		<div className="flex w-full px-9 pt-3 pb-2 justify-between">
			<RenderList
				data={buttons}
				render={(item, i) => (
					<Fragment key={i}>
						{item.to ? (
							<Link to={item?.to} onClick={item.onclick}>
								<MobileNavigationButton label={item.key}>{item.icon}</MobileNavigationButton>
							</Link>
						) : (
							<MobileNavigationButton label={item.key} onClick={item.onclick}>
								{item.icon}
							</MobileNavigationButton>
						)}
					</Fragment>
				)}
			/>
		</div>
	);
}
