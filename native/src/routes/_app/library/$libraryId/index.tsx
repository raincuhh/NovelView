import { useAuthStore } from "@/features/auth/authStore";
import LibraryBackground from "@/pages/libraries/components/ui/libraryBackground";
import { useLibraryCover } from "@/features/libraries/hooks/useLibraryCover";
import LibraryHeader from "@/pages/libraries/components/ui/libraryHeader";
import LibraryNavbar from "@/pages/libraries/components/ui/libraryNavbar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/library/$libraryId/")({
	beforeLoad: ({ location }) => {
		const libraryId = location.pathname.split("/").filter(Boolean).pop();
		const userId = useAuthStore.getState().user?.auth.id;

		return {
			userId,
			bookQueryOptions: {
				queryKey: ["books", userId, libraryId],
				queryFn: async () => {
					if (!userId && !libraryId) throw new Error("User ID & Library ID is missing");
					return null; //TODO: make the getlibrarybookDisplays here.
				},
			},
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { libraryId } = useParams({ from: "/_app/library/$libraryId" });
	const { coverPath } = useLibraryCover(libraryId);

	const { bookQueryOptions, userId } = Route.useRouteContext();
	const { data: books, isLoading } = useQuery({
		...bookQueryOptions,
		enabled: !!userId && !!libraryId,
	});

	const hasBooks = books !== null;

	return (
		<div className="flex flex-col h-full">
			<div className="relative flex flex-col h-full">
				<LibraryBackground coverPath={coverPath ?? ""} />
				<div className="relative flex flex-col h-full">
					<LibraryNavbar />
					<LibraryHeader coverPath={coverPath ?? ""} />
					<div className="flex flex-col mt-2 h-full">
						{isLoading ? (
							<div>loading...</div>
						) : hasBooks ? (
							<div className="flex flex-col gap-12 h-dvh"></div>
						) : (
							<div className="h-[200dvh]">No books?</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
