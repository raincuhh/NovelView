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
import EmptyLibrary from "@/features/library/components/ui/emptyLibrary";
import { useLibraryProvider } from "@/features/library/libraryProvider";
import { getAllBooks } from "@/features/books/lib/selectBook";

// import TestList from "@/features/test/components/ui/testList";

export const Route = createFileRoute("/_app/library/$libraryId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { libraryId } = useParams({ from: "/_app/library/$libraryId" });
	const { coverPath } = useLibraryCover(libraryId);

	const { data: books, isLoading } = useBooksByLibraryIdQuery(libraryId);

	const hasBooks = !!books && books.length > 0;

	const [isScrolled, setIsScrolled] = useState(false);
	const scrollContainerRef = useRef<OverlayScrollbarsComponentRef | null>(null);

	const libraryHeaderRef = useRef<HTMLDivElement | null>(null);
	const [scrollHeight, setScrollHeight] = useState<number>(225);
	const { library } = useLibraryProvider();

	useEffect(() => {
		const ref = libraryHeaderRef.current;
		if (!ref) return;

		setScrollHeight(ref.clientHeight);
	}, [libraryHeaderRef]);

	useEffect(() => {
		const test = () => {
			console.log(getAllBooks());
		};

		test();
	}, []);

	useEffect(() => {
		console.log("/library/$libraryid route mounted");

		if (isLoading) console.log("Still loading books...");
		else if (hasBooks) console.log("User has books", books);
		else console.log("No books found - showing EmptyBooks");
	}, [books, isLoading]);

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
					<div className="flex flex-col mt-2">
						{isLoading ? (
							<div>loading...</div>
						) : hasBooks ? (
							<div className="flex flex-col gap-8">
								awdwa
								<MobileBottomPadding />
							</div>
						) : (
							<div className="flex flex-col">
								<EmptyLibrary libraryType={library?.type ?? "local"} libraryId={libraryId} />
								{/* <TestList count={50} /> */}
								<MobileBottomPadding />
							</div>
						)}
					</div>
				</div>
			</div>
		</ScrollContainer>
	);
}
