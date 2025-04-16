import { useAuthStore } from "@/features/auth/authStore";
import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import { getCombinedLibraries } from "@/features/libraries/libraryService";
import { EpubInfo } from "@/features/parsing/types";
import { parseEpub } from "@/features/parsing/lib/epubParser";
import ActivityCalendar from "@/pages/home/components/ui/activityCalendar";
import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import QuickAccess from "@/pages/home/components/ui/quickAccess";
import Recents from "@/pages/home/components/ui/recents";
import WelcomeUserMessage from "@/shared/components/ui/welcomeUserMessage";
import { cn } from "@/shared/lib/globalUtils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { logParsedEpubContents } from "@/features/parsing/lib/utils";

export const Route = createFileRoute("/_app/_home/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const userId = useAuthStore((state) => state.user?.auth.id);

	const { data: libraries = [] } = useQuery({
		queryKey: ["libraries", userId],
		queryFn: async () => {
			if (!userId) throw new Error("User ID is missing");
			return getCombinedLibraries(userId);
		},
		enabled: !!userId,
	});

	const hasLibraries = libraries.length > 0;

	// useEffect(() => {
	// 	console.log("Libraries Data:", libraries);
	// 	if (error) console.error("Query Error:", error);
	// }, [libraries, error]);

	// const epubObj = parseEpub("/assets/test/epubs/file-1.epub", { type: "path" });

	// console.log("epub content: ", epubObj);
	useEffect(() => {
		const examplePath = "C:/Dev/Repos/NovelView/native/public/assets/test/epubs/Kill the Sun (1-384).epub";
		console.log("parsing path: ", examplePath);

		const fetchEpub = async () => {
			try {
				const obj: EpubInfo = await parseEpub(examplePath);
				// logParsedEpubContents(obj);
			} catch (err) {
				console.error("Failed to parse EPUB:", err);
			}
		};

		fetchEpub();
	}, []);

	return (
		<div className="flex flex-col h-full">
			<div className="px-4 min-h-12 pt-4 max-w-full truncate overflow-hidden whitespace-nowrap flex items-center">
				<WelcomeUserMessage />
			</div>
			<div className={cn("flex flex-col relative h-full")}>
				<HomeNavbar />
				<div className="flex flex-col mt-2 h-full">
					{hasLibraries ? (
						<div className="flex flex-col gap-12 h-[100dvh]">
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
