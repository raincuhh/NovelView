import { useAuthStore } from "@/features/auth/authStore";
import LibraryBackground from "@/pages/library/components/ui/libraryBackground";
import { useLibraryCover } from "@/features/libraries/hooks/useLibraryCover";
import LibraryHeader from "@/pages/library/components/ui/libraryHeader";
import LibraryNavbar from "@/pages/library/components/ui/libraryNavbar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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

	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			const container = scrollRef.current;
			if (container) {
				setIsScrolled(container.scrollTop > 100);
				console.log(container.scrollTop);
			}
		};

		const container = scrollRef.current;
		if (container) {
			container.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (container) {
				container.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	return (
		<div className="flex flex-col h-full">
			<div className="relative flex flex-col h-full">
				<LibraryBackground coverPath={coverPath ?? ""} />
				<div className="relative flex flex-col">
					<LibraryNavbar isScrolled={isScrolled} />
					<LibraryHeader coverPath={coverPath ?? ""} />
					<div className="flex flex-col mt-2">
						<div ref={scrollRef} className="flex flex-col h-[200dvh]">
							{isLoading ? (
								<div>loading...</div>
							) : hasBooks ? (
								<div className="flex flex-col gap-12"></div>
							) : (
								<div className="">No books?</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
