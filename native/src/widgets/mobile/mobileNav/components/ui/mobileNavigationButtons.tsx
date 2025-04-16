import Icon from "@/shared/components/ui/icon";
import MobileNavigationButton from "./mobileNavigationButton";
import { Link, useRouter } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import RenderList from "@/shared/components/utils/renderList";
import { cn } from "@/shared/lib/globalUtils";

export default function MobileNavigationButtons() {
	const router = useRouter();

	const [historyStack, setHistoryStack] = useState<string[]>(["/home"]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const canGoBack = currentIndex > 0;
	const canGoForward = currentIndex < historyStack.length - 1;

	const navigateTo = (path: string) => {
		setHistoryStack((prev) => {
			const trimmed = prev.slice(0, currentIndex + 1);
			const updated = [...trimmed, path];
			setCurrentIndex(updated.length - 1);
			return updated;
		});
		router.navigate({ to: path });
	};

	const goBack = () => {
		if (canGoBack) {
			const newIndex = currentIndex - 1;
			setCurrentIndex(newIndex);
			router.navigate({ to: historyStack[newIndex] });
		}
	};

	const goForward = () => {
		if (canGoForward) {
			const newIndex = currentIndex + 1;
			setCurrentIndex(newIndex);
			router.navigate({ to: historyStack[newIndex] });
		}
	};

	const buttons = [
		{
			key: "home",
			icon: (() => {
				const isActive = router.state.location.pathname === "/home";
				const IconComponent = isActive ? Icon.home : Icon.hollowHome;
				const iconClass = cn("h-7 w-7", isActive ? "fill-accent" : "fill-muted");

				return <IconComponent className={iconClass} />;
			})(),
			to: "/home",
			onclick: () => navigateTo("/home"),
		},
		{
			key: "back",
			icon: <Icon.chevronLeft className={cn("h-7 w-7", canGoBack ? "fill-accent" : "fill-faint")} />,
			onclick: goBack,
		},
		{
			key: "forward",
			icon: <Icon.chevronRight className={cn("h-7 w-7", canGoForward ? "fill-accent" : "fill-faint")} />,
			onclick: goForward,
		},
		{
			key: "search",
			icon: (() => {
				const isActive = router.state.location.pathname === "/search";
				const IconComponent = isActive ? Icon.searchFilled : Icon.searchHollow;
				const iconClass = cn("h-7 w-7", isActive ? "fill-accent" : "fill-muted");

				return <IconComponent className={iconClass} />;
			})(),
			to: "/search",
			onclick: () => navigateTo("/search"),
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
			to: "/libraries",
			onclick: () => navigateTo("/libraries"),
		},
	];

	return (
		<div className="flex w-full px-4 pt-4 pb-4 justify-between">
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
//TODO: turn this into a global provider (specifically the history nagivation part.)
