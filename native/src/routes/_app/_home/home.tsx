import { useAuthStore } from "@/features/auth/authStore";
import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import { getCombinedLibraries } from "@/features/libraries/libraryService";
import ActivityCalendar from "@/pages/home/components/ui/activityCalendar";
import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import QuickAccess from "@/pages/home/components/ui/quickAccess";
import Recents from "@/pages/home/components/ui/recents";
import WelcomeUserMessage from "@/shared/components/ui/welcomeUserMessage";
import { cn } from "@/shared/lib/globalUtils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_app/_home/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const userId = useAuthStore((state) => state.user?.auth.id);

	const { data: libraries = [], error } = useQuery({
		queryKey: ["libraries", userId],
		queryFn: async () => {
			if (!userId) throw new Error("User ID is missing");
			return getCombinedLibraries(userId);
		},
		enabled: !!userId,
	});

	const hasLibraries = libraries.length > 0;

	useEffect(() => {
		console.log("Libraries Data:", libraries);
		if (error) console.error("Query Error:", error);
	}, [libraries, error]);

	return (
		<div className="flex flex-col h-full">
			<div className="px-4 min-h-12 pt-4 max-w-full truncate overflow-hidden whitespace-nowrap flex items-center">
				<WelcomeUserMessage />
			</div>
			<div className={cn("flex flex-col relative h-full", hasLibraries ? "h-[150dvh]" : "")}>
				<HomeNavbar />
				<div className="flex flex-col mt-2 h-full">
					{hasLibraries ? (
						<div className="flex flex-col gap-12">
							<QuickAccess />
							<Recents />
							<ActivityCalendar />
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
