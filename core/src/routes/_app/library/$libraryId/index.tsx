import LibraryBackground from "@/pages/library/components/ui/libraryBackground";
import LibraryHeader from "@/pages/library/components/ui/libraryHeader";
import LibraryNavbar from "@/pages/library/components/ui/libraryNavbar";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ScrollContainer from "@/shared/components/ui/scrollContainer";
import type { OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import MobileBottomPadding from "@/shared/components/ui/mobileBottomPadding";
import { useBooksByLibraryIdQuery } from "@/features/books/model/queries/useBookQuery";
import EmptyLibrary from "@/features/library/components/ui/emptyLibrary";
import { useLibraryProvider } from "@/features/library/libraryProvider";
import FadeIn from "@/shared/components/ui/fadeIn";

export const Route = createFileRoute("/_app/library/$libraryId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { library, coverPath } = useLibraryProvider();

	const { data: books } = useBooksByLibraryIdQuery(library.id);
	const hasBooks = books.length > 0;

	const [isScrolled, setIsScrolled] = useState(false);
	const [scrollHeight, setScrollHeight] = useState<number>(225);
	const scrollContainerRef = useRef<OverlayScrollbarsComponentRef | null>(null);
	const libraryHeaderRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const ref = libraryHeaderRef.current;
		if (!ref) return;
		setScrollHeight(ref.clientHeight);
	}, [libraryHeaderRef]);

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
					<FadeIn>
						<LibraryNavbar isScrolled={isScrolled} />
					</FadeIn>
					<FadeIn>
						<LibraryHeader ref={libraryHeaderRef} coverPath={coverPath ?? ""} />
					</FadeIn>

					<div className="flex flex-col mt-2">
						{hasBooks ? (
							<>
								awdwa
								<MobileBottomPadding />
							</>
						) : (
							<>
								<FadeIn>
									<EmptyLibrary />
								</FadeIn>
								<MobileBottomPadding />
							</>
						)}
					</div>
				</div>
			</div>
		</ScrollContainer>
	);
}
