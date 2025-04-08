import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import QuickAccess from "@/pages/home/components/ui/quickAccess";
import RecentlyRead from "@/pages/home/components/ui/recentlyRead";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_home/home")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col h-[150dvh] relative">
				<HomeNavbar />
				<div className="flex flex-col mt-4 gap-12">
					<QuickAccess />
					<RecentlyRead />
				</div>
			</div>
		</div>
	);
}
