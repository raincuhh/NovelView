import { useAuthStore } from "@/features/auth/authStore";
import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import ActivityCalendar from "@/pages/home/components/ui/activityCalendar";
import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import { createFileRoute } from "@tanstack/react-router";
import InitUserTables from "@/features/user/components/utils/initUserTables";
import QuickAccessErrorBoundary from "@/pages/home/components/ui/quickAccessErrorBoundary";
// @ts-ignore
import RecentsErrorBoundary from "@/pages/home/components/ui/recentsErrorBoundary";
// @ts-ignore
import ReadingNowErrorBoundary from "@/pages/home/components/ui/readingNowErrorBoundary";
import MobileBottomPadding from "@/shared/components/ui/mobileBottomPadding";
import ScrollContainer from "@/shared/components/ui/scrollContainer";
import { useUserFirstLibraryQuery } from "@/features/books/model/queries/useBookQuery";
import FadeIn from "@/shared/components/ui/fadeIn";
import TestList from "@/features/test/components/ui/testList";

export const Route = createFileRoute("/_app/_home/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();

	const { data: libraries } = useUserFirstLibraryQuery(userId);
	const hasLibraries = !!libraries;

	return (
		<>
			<InitUserTables />
			<FadeIn>
				<HomeNavbar />
			</FadeIn>
			<ScrollContainer className="h-full pt-2">
				<div className="h-full gap-8 flex flex-col">
					{hasLibraries ? (
						<>
							<FadeIn>
								<QuickAccessErrorBoundary />
							</FadeIn>
							{/* <FadeIn>
								<RecentsErrorBoundary />
							</FadeIn> */}
							<FadeIn>
								<ActivityCalendar />
							</FadeIn>
							<FadeIn>
								<TestList count={50} />
							</FadeIn>
							<MobileBottomPadding />
						</>
					) : (
						<>
							<FadeIn>
								<EmptyLibraries value="You have no libraries." />
							</FadeIn>
							<MobileBottomPadding />
						</>
					)}
				</div>
			</ScrollContainer>
		</>
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
