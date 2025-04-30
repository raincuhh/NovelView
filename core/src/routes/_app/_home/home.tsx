import { useAuthStore } from "@/features/auth/authStore";
import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import ActivityCalendar from "@/pages/home/components/ui/activityCalendar";
import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import { createFileRoute } from "@tanstack/react-router";
import InitUserTables from "@/features/user/components/utils/initUserTables";
import QuickAccessErrorBoundary from "@/pages/home/components/ui/quickAccessErrorBoundary";
import RecentsErrorBoundary from "@/pages/home/components/ui/recentsErrorBoundary";
import ReadingNowErrorBoundary from "@/pages/home/components/ui/readingNowErrorBoundary";
import MobileBottomPadding from "@/shared/components/ui/mobileBottomPadding";
import ScrollContainer from "@/shared/components/ui/scrollContainer";
import { useUserFirstLibraryQuery } from "@/features/books/model/queries/useBookQuery";
import { useEffect } from "react";

export const Route = createFileRoute("/_app/_home/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();

	const { data: libraries, isLoading } = useUserFirstLibraryQuery(userId);

	const hasLibraries = !!libraries;

	useEffect(() => {
		console.log("Home route mounted");
		if (!userId) console.warn("No userId yet");
		if (isLoading) console.log("Still loading libraries...");
		else if (hasLibraries) console.log("User has libraries");
		else console.log("No libraries found - showing EmptyLibraries");
	}, [userId, libraries, isLoading]);

	return (
		<ScrollContainer className="h-full">
			<InitUserTables />
			<div className="relative flex flex-col h-full pt-12">
				<HomeNavbar isLoading={isLoading} />
				<div className="flex flex-col h-full mt-2">
					{isLoading ? (
						<div></div>
					) : hasLibraries ? (
						<div className="flex flex-col gap-8">
							<QuickAccessErrorBoundary />
							<ReadingNowErrorBoundary />
							<RecentsErrorBoundary />
							<ActivityCalendar />
							<MobileBottomPadding />
						</div>
					) : (
						<>
							<EmptyLibraries />
						</>
					)}
				</div>
			</div>
		</ScrollContainer>
	);
}

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
