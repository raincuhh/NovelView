import { useTitlebarStore } from "../../titlebarStore";
import { getCurrentWindow } from "@tauri-apps/api/window";
import Icon from "@/shared/components/ui/icon";
import { cn } from "@/shared/lib/globalUtils";
import RenderList from "@/shared/components/utils/renderList";
import Separator from "@/shared/components/ui/separator";
import TitlebarHelperButtons from "./titlebarHelperButtons";

export default function Titlebar() {
	const appWindow = getCurrentWindow();

	// const { buttons, alignment } = useTitlebarStore((state) => ({
	// 	buttons: state.buttons,
	// 	alignment: state.alignment,
	// }));

	const { buttons, alignment } = useTitlebarStore();

	const handleAction = async (action: "minimize" | "maximize" | "close") => {
		switch (action) {
			case "minimize":
				await appWindow.minimize();
				break;
			case "maximize":
				await appWindow.toggleMaximize();
				break;
			case "close":
				await appWindow.close();
				break;
		}
	};

	const renderButton = (type: "minimize" | "maximize" | "close") => {
		const IconComponent = {
			minimize: Icon.minus,
			maximize: Icon.rectangle,
			close: Icon.x,
		}[type];

		const iconSize = type === "maximize" ? "w-4 h-4" : "w-6 h-6";

		return {
			type: type,
			icon: <IconComponent className={cn("fill-muted group-hover:fill-normal", iconSize)} />,
			onclick: () => handleAction(type),
		};
	};

	const mappedButtons = buttons.map(renderButton);
	//pl-18 pr-16
	//const hoverStyle = type === "close" ? "hover:bg-interactive-danger" : "hover:bg-primary";
	return (
		<div style={{ gridArea: "titlebar" }}>
			<div className="w-full h-full" data-tauri-drag-region>
				<div className="flex w-full h-full relative pointer-events-none">
					{alignment === "right" && (
						<ul className="top-0 right-0 flex w-full absolute h-full justify-end pointer-events-none">
							<TitlebarHelperButtons />
							<RenderList
								data={mappedButtons}
								getKey={(button, i) => `titlebar-button-${button.type}-${i}`}
								render={(button) => {
									const hoverStyle =
										button.type === "close" ? "hover:bg-interactive-danger" : "hover:bg-secondary";

									return (
										<li
											className={cn(
												"h-full px-2 pointer-events-auto cursor-pointer flex items-center group",
												hoverStyle
											)}
											onClick={button.onclick}
										>
											{button.icon}
										</li>
									);
								}}
							/>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
