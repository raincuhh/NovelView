import { MOCK_BOOKS } from "@/features/books/const";
import RenderList from "@/shared/components/utils/renderList";
import { Book } from "@/shared/lib/appSchema";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import RecentsItem from "./recentsItem";
import HomeSectionHeader from "./homeSectionHeader";

export default function Recents() {
	const books: Book[] = MOCK_BOOKS;
	const isLoading: boolean = true;
	const error: Error | null = null;

	const [coverPaths, setCoverPaths] = useState<Record<string, string | null>>({});
	const [loadingCovers, setLoadingCovers] = useState<boolean>(true);

	useEffect(() => {
		if (!books?.length) return;

		const loadCovers = async () => {
			setLoadingCovers(true);
			const entries = await Promise.all(
				books.map(async (book) => {
					// for now il just return the cover_book url if it has one.
					// TODO: implement getting book cover image url.
					// const cover = await getBookCoverPath(lib.id);
					const cover = book?.cover_image_url;
					return [book.id, cover] as const;
				})
			);

			setCoverPaths(Object.fromEntries(entries));
			setLoadingCovers(false);
		};

		loadCovers();
	}, [books]);

	const isFullyloading = isLoading || loadingCovers;
	const hasBooks = !!books && books.length > 0;

	if (isFullyloading) return <RecentsSkeleton />;
	if (error) {
		// @ts-expect-error
		console.log(error.message);
		return (
			<RecentsWrapper>
				<p className="text-danger text-center font-bold">Error loading recent books.</p>
			</RecentsWrapper>
		);
	}

	if (!hasBooks) return null;

	return (
		<RecentsWrapper>
			<HomeSectionHeader label="Continue" SeeMoreto="/home/recents" />
			<RecentsList books={books} coverPaths={coverPaths} />
		</RecentsWrapper>
	);
}

const RecentsWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col">{children}</div>
);

const RecentsList = ({ books, coverPaths }: { books: Book[]; coverPaths: Record<string, string | null> }) => {
	const bookPairs = books.map((book) => [book, coverPaths[book.id]] as const);

	return (
		<div className="relative flex flex-col mt-2 gap-2 w-full">
			<ul className="flex py-2 px-4 gap-4 snap-x snap-mandatory overflow-x-scroll">
				<RenderList
					data={bookPairs}
					render={([book, coverPath]) => <RecentsItem key={book.id} book={book} coverPath={coverPath} />}
				/>
			</ul>
		</div>
	);
};

const RecentsSkeleton = () => (
	<RecentsWrapper>
		<HomeSectionHeader label="Continue" SeeMoreto="/home/recents" />
		<div className="relative flex flex-col mt-2 gap-2 w-full">
			<ul className="flex py-2 pr-4 snap-x snap-mandatory overflow-x-scroll">
				{Array.from({ length: 16 }).map((_, i) => (
					<li key={i} className="min-w-48 h-26 relative snap-start pl-4">
						<Skeleton className="h-full w-full rounded-md" />
						{/* <div className="absolute top-1/2 left-0 w-full px-4 translate-y-[-50%]">
							<Skeleton className="w-6 h-6" />
						</div> */}
					</li>
				))}
			</ul>
		</div>
	</RecentsWrapper>
);

{
	/* {books.map((book) => (
				<li key={book.id} className="bg-muted rounded-md p-2 flex gap-2 items-center">
					<div className="w-10 h-14 bg-background rounded overflow-hidden">
						{coverPaths[book.id] ? (
							<img
								src={coverPaths[book.id] || ""}
								alt={book.title ?? "book cover"}
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="bg-muted w-full h-full" />
						)}
					</div>
					<p className="font-semibold text-sm">{book.title}</p>
				</li>
			))} */
}
