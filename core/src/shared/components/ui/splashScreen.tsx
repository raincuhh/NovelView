import Icon from "../ui/icon";

export default function SplashScreen() {
	return (
		<div className="fixed flex flex-col w-screen h-screen overflow-hidden pointer-events-none select-none z-10000">
			<div className="flex justify-center items-center bg-primary">
				<Icon.brandLogo className="w-36 h-36 fill-accent" />
			</div>
		</div>
	);
}
