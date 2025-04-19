import { useAuthStore } from "@/features/auth/authStore";
import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import ActivityCalendar from "@/pages/home/components/ui/activityCalendar";
import HomeNavbar from "@/pages/home/components/ui/homeNavbar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getFirstLibrary } from "@/features/libraries/lib/selectLibrary";
import InitUserTables from "@/features/auth/components/utils/initUserTables";
import { useEffect, useState } from "react";
import QuickAccessErrorBoundary from "@/pages/home/components/ui/quickAccessErrorBoundary";
import RecentsErrorBoundary from "@/pages/home/components/ui/recentsErrorBoundary";
import { Drawer } from "@/shared/components/ui/drawer";

// import { powersyncDb } from "@/shared/providers/systemProvider";
// import { useEffect } from "react";
// import { logParsedEpubContents } from "@/features/parsing/lib/utils";
// import { TEST_EPUB_KTS_FILE_NAME } from "@/shared/lib/consts";
// import { EpubInfo } from "@/features/parsing/types";
// import { parseEpub } from "@/features/parsing/lib/epubParser";

export const Route = createFileRoute("/_app/_home/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const userId = useAuthStore((state) => state.user?.auth.id);

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
	// 	const examplePath = TEST_EPUB_KTS_FILE_NAME;
	// 	console.log("parsing path: ", examplePath);

	// 	const fetchEpub = async () => {
	// 		try {
	// 			const obj: EpubInfo = await parseEpub(examplePath);
	// 			logParsedEpubContents(obj);
	// 		} catch (err) {
	// 			console.error("Failed to parse EPUB:", err);
	// 		}
	// 	};

	// 	fetchEpub();
	// }, []);

	const [leftOpen, setLeftOpen] = useState<boolean>(false);
	const [rightOpen, setRightOpen] = useState<boolean>(false);

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
								<h1 onClick={() => setLeftOpen(true)}>open left drawer</h1>
								<h1 onClick={() => setRightOpen(true)}>open right drawer</h1>
								<Drawer side="left" isOpen={leftOpen} onClose={() => setLeftOpen(false)}>
									<div className="p-4">Left Drawer Content</div>
								</Drawer>
								<Drawer side="right" isOpen={rightOpen} onClose={() => setRightOpen(false)}>
									<div className="p-4">Right Drawer Content</div>
								</Drawer>
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
		</div>
	);
}
