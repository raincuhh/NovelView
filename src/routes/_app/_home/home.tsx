import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_home/home")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col h-[150dvh]">
			<HomeNavbar />
		</div>
	);
}
