import { useAuthStore } from "@/features/auth/authStore";
import LibraryHeader from "@/pages/libraries/components/ui/libraryHeader";
import LibraryNavbar from "@/pages/libraries/components/ui/libraryNavbar";
import { useQuery } from "@tanstack/react-query";

import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/library/$libraryId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const userId = useAuthStore((state) => state.user?.auth.id);
	const libraryId = useParams({ from: "/_app/library/$libraryId" });

	const { data: books, isLoading } = useQuery({
		queryKey: ["books", userId, libraryId],
		queryFn: async () => {
			if (!userId && !libraryId) throw new Error("User ID & Library ID is missing");
			return null; //TODO: make the getlibrarybookDisplays here.
		},
		enabled: !!userId && !!libraryId,
	});

	const hasBooks = books !== null;

	return (
		<div className="flex flex-col h-full">
			<div className="flex flex-col relative h-full">
				<LibraryNavbar />
				<LibraryHeader />
				<div className="flex flex-col mt-2 h-full">
					{isLoading ? (
						<div>loading...</div>
					) : hasBooks ? (
						<div className="flex flex-col gap-12 h-[100dvh]"></div>
					) : (
						<div className="h-dvh">No books?</div>
					)}
				</div>
			</div>
		</div>
	);
}
