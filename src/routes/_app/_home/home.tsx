import { useAuthStore } from "@/features/auth/authStore";
import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import QuickAccess from "@/pages/home/components/ui/quickAccess";
import Recents from "@/pages/home/components/ui/recents";
import WelcomeUserMessage from "@/shared/components/ui/welcomeUserMessage";
import { useQuery } from "@powersync/tanstack-react-query";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_home/home")({
	component: RouteComponent,
	loader: () => {
		const userId = useAuthStore((state) => state.user?.auth.id);

		const { data: libraries } = useQuery({
			queryKey: ["libraries"],
			query: "SELECT * FROM libraries WHERE user_id = ?",
			parameters: [userId],
		});

		return { libraries };
	},
});

function RouteComponent() {
	const { libraries } = useLoaderData({ from: "/_app/_home/home" });
	const hasLibraries = libraries && libraries.length > 0;
	// do whatever the fuck i was gonna do.

	return (
		<div className="flex flex-col">
			<div className="pt-12 pb-2 px-4 max-w-full truncate overflow-hidden whitespace-nowrap">
				<WelcomeUserMessage />
			</div>
			<div className="flex flex-col h-[150dvh] relative">
				<HomeNavbar />
				<div className="flex flex-col mt-2 gap-12">
					<QuickAccess />
					<Recents />
				</div>
			</div>
		</div>
	);
}
