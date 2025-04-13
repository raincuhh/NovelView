import { useAuthStore } from "@/features/auth/authStore";
import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import QuickAccess from "@/pages/home/components/ui/quickAccess";
import Recents from "@/pages/home/components/ui/recents";
import WelcomeUserMessage from "@/shared/components/ui/welcomeUserMessage";
import { Libraries } from "@/shared/lib/appSchema";
import { cn } from "@/shared/lib/globalUtils";
import { useQuery } from "@powersync/tanstack-react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_home/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const userId = useAuthStore((state) => state.user?.auth.id);

	const { data: libraries = [] } = useQuery<Libraries[]>({
		queryKey: ["libraries", userId],
		query: "SELECT * FROM libraries WHERE user_id = ?",
		parameters: [userId],
		enabled: !!userId,
	});

	const hasLibraries = libraries.length > 0;

	return (
		<div className="flex flex-col h-full">
			<div className="pt-12 pb-2 px-4 max-w-full truncate overflow-hidden whitespace-nowrap">
				<WelcomeUserMessage />
			</div>
			<div className={cn("flex flex-col relative h-full", hasLibraries ? "h-[150dvh]" : "")}>
				<HomeNavbar />
				<div className="flex flex-col mt-2 h-full">
					{hasLibraries ? (
						<div className="flex flex-col gap-12">
							<QuickAccess />
							<Recents />
						</div>
					) : (
						<div className="px-4 flex flex-col justify-center h-full pb-48">
							<EmptyLibraries />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
