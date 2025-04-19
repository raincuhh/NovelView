import { MOCK_BOOKS } from "@/features/books/const";
import { Book } from "@/shared/lib/appSchema";
import { useEffect, useState } from "react";
import HomeSectionHeader from "./homeSectionHeader";
import Skeleton from "react-loading-skeleton";
import Icon from "@/shared/components/ui/icon";
import { getTimeAgo } from "@/shared/lib/globalUtils";
import { Cover, CoverImage } from "@/shared/components/ui/cover";
import { PLACEHOLDER_RECENTLY_READ_URL } from "@/shared/lib/consts";

export default function ReadingNow() {
	const book: Book = MOCK_BOOKS[0];
	const isLoading: boolean = true;
	const error: Error | null = null;

	const [coverPath, setCoverPath] = useState<Record<string, string | null>>({});
	const [loadingCover, setLoadingCover] = useState<boolean>(true);

	//TODO: implemenet querying most recently read/reading now book.

	useEffect(() => {
		if (!book) return;

		const loadCover = async () => {
			setLoadingCover(true);
			const cover = book?.cover_image_url;
			setCoverPath({ [book.id]: cover });
		};

		loadCover();
		setLoadingCover(false);
	}, [book]);

	const isFullyloading = isLoading || loadingCover;
	const hasBook = !!book;

	if (isFullyloading) return <ReadingNowSkeleton />;
	if (error) {
		// @ts-expect-error
		console.log(error.message);
		return (
			<ReadingNowWrapper>
				<p className="text-danger text-center font-bold">Error loading currently read book.</p>
			</ReadingNowWrapper>
		);
	}

	if (!hasBook) return null;

	return (
		<ReadingNowWrapper>
			<HomeSectionHeader label="Reading Now" />
			<ReadingNowDisplay book={book} coverPath={coverPath} />
		</ReadingNowWrapper>
	);
}

const ReadingNowWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col">{children}</div>
);

//TODO: instead of coverpath, i want to use the current chapter you are in the book in like a book format reading view.
// see: https://www.google.com/search?client=opera&hs=4u5&sca_esv=999408e326bfc446&sxsrf=AHTn8zr11DkGdFT1uqAQY95s6KFPXBH-FA:1745042173239&q=apple+books&udm=2&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBteutRhCIwSdaS7of3GY5DTFLwljmhukYwLUB-yIwO6kn9ergnmIq2g-xQeCW-gxzb_MJbj4sdtmtN4T-SQ2hVvT9p8oMaJfKqTJ7Kfp2L_oYgjoAiqPMabOUU17pZcY9HKWPIFRIFBj1mhZurFoG9QCRjeN&sa=X&ved=2ahUKEwjAm-rWtOOMAxVpBNsEHVh5NRsQtKgLegQIGxAB&biw=1387&bih=905&dpr=1#vhid=I08o9eHgnmJ1OM&vssid=mosaic

// @ts-ignore
const ReadingNowDisplay = ({ book, coverPath }: { book: Book; coverPath: Record<string, string | null> }) => {
	const totalChapters = 729; // mock
	const readCount = book.read_count || 0;
	const percentage = ((readCount / totalChapters) * 100).toFixed(1); // mock
	const progress = `${readCount} / ${totalChapters} (${percentage}%)`;

	const timeAgo = book.last_read_at ? getTimeAgo(new Date(book.last_read_at)) : "Unknown";

	return (
		<div className="flex flex-col w-full px-4">
			<header className="w-full h-min flex justify-center items-center min-h-32 select-none">
				<div className="relative select-none h-62 w-46">
					<Cover className="rounded-md w-full h-full">
						<CoverImage src={PLACEHOLDER_RECENTLY_READ_URL} alt="cover" />
					</Cover>
				</div>
			</header>
			<aside className="flex flex-col mt-4">
				<h2>{book.title}</h2>
				<div className="w-full flex justify-between">
					<span className="text-muted text-sm">
						{progress} · {timeAgo}
					</span>

					<div className="p-2 -m-2 cursor-pointer">
						<Icon.dottedHorizontalRounded className="fill-muted" />
					</div>
				</div>
			</aside>
		</div>
	);
};

const ReadingNowSkeleton = () => (
	<ReadingNowWrapper>
		<HomeSectionHeader label="Reading Now" />
		<div className="flex flex-col w-full px-4">
			<header className="w-full h-min flex justify-center items-center min-h-32 select-none">
				<div className="relative select-none h-48 w-full">
					<Skeleton className="w-full h-full" />
				</div>
			</header>
			<aside className="flex flex-col mt-4">
				<h2>
					<Skeleton width={"45%"} />
				</h2>
				<div className="w-full flex justify-between">
					<span>
						<Skeleton width={"3rem"} />
					</span>
					<div className="p-2 -m-2 cursor-pointer">
						<Skeleton width={"2rem"} />
					</div>
				</div>
			</aside>
		</div>
	</ReadingNowWrapper>
);
