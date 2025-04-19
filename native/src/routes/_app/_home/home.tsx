import { useAuthStore } from "@/features/auth/authStore";
import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import ActivityCalendar from "@/pages/home/components/ui/activityCalendar";
import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getFirstLibrary } from "@/features/libraries/lib/selectLibrary";
import InitUserTables from "@/features/auth/components/utils/initUserTables";
import QuickAccessErrorBoundary from "@/pages/home/components/ui/quickAccessErrorBoundary";
import RecentsErrorBoundary from "@/pages/home/components/ui/recentsErrorBoundary";
import { Drawer } from "@/features/drawer/components/ui/drawer";
import { useDrawerStore } from "@/features/drawer/drawerStore";
import { useEffect } from "react";

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
	const userId = useAuthStore((state) => state.user?.auth.id);
	const { openDrawer } = useDrawerStore();

	const { data: libraries, isLoading } = useQuery({
		queryKey: ["library", userId],
		queryFn: async () => {
			if (!userId) throw new Error("User ID is missing");
			return getFirstLibrary(userId);
		},
		enabled: !!userId,
	});

	const hasLibraries = !!libraries;

	useEffect(() => {
		console.log("libraries: ", libraries);
	}, [libraries]);

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
				<HomeNavbar />
				<div className="flex flex-col mt-2 h-full">
					{isLoading ? (
						<div></div>
					) : hasLibraries ? (
						<div className="flex flex-col gap-8">
							<QuickAccessErrorBoundary />
							<RecentsErrorBoundary />
							<ActivityCalendar />
							<div className="flex flex-col">
								<h1 onClick={() => openDrawer("profile")}>open left drawer</h1>
								<h1 onClick={() => openDrawer("settings")}>open right drawer</h1>
							</div>
							<div className="flex flex-col gap-1">
								{Array.from({ length: 50 }, (_, i) => (
									<div key={i} className="bg-accent hover:bg-primary-alt px-4 rounded-md">
										Item #{i + 1}
									</div>
								))}
							</div>
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
			<Drawer side="right" id="settings">
				<div className="p-4">Right Drawer Content</div>
			</Drawer>
		</div>
	);
}
