import { useAuthStore } from "@/features/auth/authStore";
import LibraryBackground from "@/pages/library/components/ui/libraryBackground";
import { useLibraryCover } from "@/features/libraries/hooks/useLibraryCover";
import LibraryHeader from "@/pages/library/components/ui/libraryHeader";
import LibraryNavbar from "@/pages/library/components/ui/libraryNavbar";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ScrollContainer from "@/shared/components/ui/scrollContainer";
import type { OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import MobileBottomPadding from "@/shared/components/ui/mobileBottomPadding";
import { useBooksByLibraryIdQuery } from "@/features/books/model/queries/useBookQuery";

export const Route = createFileRoute("/_app/library/$libraryId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const userId = useAuthStore.getState().user?.auth.id;

	const { libraryId } = useParams({ from: "/_app/library/$libraryId" });
	const { coverPath } = useLibraryCover(libraryId);

	const { data: books, isLoading } = useBooksByLibraryIdQuery(libraryId);

	const hasBooks = books !== null;

	const [isScrolled, setIsScrolled] = useState(false);
	const scrollContainerRef = useRef<OverlayScrollbarsComponentRef | null>(null);

	const libraryHeaderRef = useRef<HTMLDivElement | null>(null);
	const [scrollHeight, setScrollHeight] = useState<number>(225);

	useEffect(() => {
		const ref = libraryHeaderRef.current;
		if (!ref) return;

		setScrollHeight(ref.clientHeight);
		console.log(ref.clientHeight);
	}, [libraryHeaderRef]);

	useEffect(() => {
		console.log("/library/$libraryid route mounted");
		if (!userId) console.warn("No userId yet");
		if (isLoading) console.log("Still loading books...");
		else if (hasBooks) console.log("User has books");
		else console.log("No books found — showing EmptyBooks");
	}, [userId, books, isLoading]);

	return (
		<ScrollContainer
			ref={scrollContainerRef}
			onCustomScroll={(scrollTop) => {
				setIsScrolled(scrollTop > scrollHeight);
			}}
			className="h-full"
		>
			<div className="relative flex flex-col h-full">
				<LibraryBackground coverPath={coverPath ?? ""} />
				<div className="relative flex flex-col">
					<LibraryNavbar isScrolled={isScrolled} />
					<LibraryHeader ref={libraryHeaderRef} coverPath={coverPath ?? ""} />
					<div className="flex flex-col mt-2 h-full">
						{isLoading ? (
							<div></div>
						) : hasBooks ? (
							<div className="flex flex-col gap-8">
								{Array.from({ length: 15 }, (_, i) => (
									<div key={i} className="px-4">
										Item {i + 1}
									</div>
								))}
								<MobileBottomPadding />
							</div>
						) : (
							<div className="">No books?</div>
						)}
					</div>
				</div>
			</div>
		</ScrollContainer>
	);
}
