import { useAuthStore } from "@/features/auth/authStore";
import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import ActivityCalendar from "@/pages/home/components/ui/activityCalendar";
import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getFirstLibrary } from "@/features/libraries/lib/selectLibraries";
import InitUserTables from "@/features/auth/components/utils/initUserTables";
import QuickAccessErrorBoundary from "@/pages/home/components/ui/quickAccessErrorBoundary";
import RecentsErrorBoundary from "@/pages/home/components/ui/recentsErrorBoundary";
import { Drawer } from "@/features/drawer/components/ui/drawer";
import { useDrawerStore } from "@/features/drawer/drawerStore";
import { useEffect } from "react";
import ReadingNowErrorBoundary from "@/pages/home/components/ui/readingNowErrorBoundary";

// import { powersyncDb } from "@/shared/providers/systemProvider";
// import {
// 	logFullParsedEpubContentsWithoutChapters,
// 	logParsedEpubContents,
// } from "@/features/parsing/lib/utils";
// import {
// 	TEST_EPUB_KTS_FILE_NAME,
// 	TEST_EPUB_RED_RISING_FILE_NAME,
// 	TEST_EPUB_SHADOW_SLAVE_VOL_1_FILE_NAME,
// } from "@/shared/lib/consts";
// import { EpubInfo } from "@/features/parsing/types";
// import { parseEpub } from "@/features/parsing/lib/epubParser";

export const Route = createFileRoute("/_app/_home/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const userId = useAuthStore((s) => s.user?.auth.id);
	// @ts-ignore
	const { openDrawer } = useDrawerStore();

	const { data: libraries, isLoading } = useQuery({
		queryKey: ["library", userId],
		queryFn: async () => {
			if (!userId) throw new Error("User ID is missing");
			return getFirstLibrary(userId);
		},
		enabled: !!userId,
		refetchInterval: 60 * 1000,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});

	const hasLibraries = !!libraries;

	useEffect(() => {
		console.log("Home route mounted");
		if (!userId) console.warn("No userId yet");
		if (isLoading) console.log("Still loading libraries...");
		else if (hasLibraries) console.log("User has libraries");
		else console.log("No libraries found — showing EmptyLibraries");
	}, [userId, libraries, isLoading]);

	// useEffect(() => {
	// 	const examplePath = TEST_EPUB_SHADOW_SLAVE_VOL_1_FILE_NAME;
	// 	console.log("parsing path: ", examplePath);

	// 	const getParsedEpub = async () => {
	// 		try {
	// 			const obj: EpubInfo = await parseEpub(examplePath);
	// 			logFullParsedEpubContentsWithoutChapters(obj);
	// 		} catch (err) {
	// 			console.error("Failed to parse EPUB:", err);
	// 		}
	// 	};

	// 	getParsedEpub();
	// }, []);

	return (
		<div className="flex flex-col h-full ">
			<InitUserTables />
			<div className="flex flex-col relative h-full pt-12">
				<HomeNavbar isLoading={isLoading} />
				<div className="flex flex-col mt-2 h-full">
					{isLoading ? (
						<div></div>
					) : hasLibraries ? (
						<div className="flex flex-col gap-8">
							<QuickAccessErrorBoundary />
							<ReadingNowErrorBoundary />
							<RecentsErrorBoundary />
							<ActivityCalendar />
						</div>
					) : (
						<div className="px-4 flex flex-col justify-center h-full pb-48">
							<EmptyLibraries />
						</div>
					)}
				</div>
			</div>
			<Drawer side="left" id="profile">
				<div className="p-4">Left Drawer Content</div>
			</Drawer>
		</div>
	);
}
