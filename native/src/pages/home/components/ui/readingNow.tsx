import { Book } from "@/features/books/types";
import { useEffect, useState } from "react";
import HomeSectionHeader from "./homeSectionHeader";
import Skeleton from "react-loading-skeleton";
import Icon from "@/shared/components/ui/icon";
import { Cover, CoverImage } from "@/shared/components/ui/cover";
import { PLACEHOLDER_RECENTLY_READ_URL } from "@/shared/lib/consts";
import { useAuthStore } from "@/features/auth/authStore";
import { useQuery } from "@tanstack/react-query";
import { getRecentlyOpenedBooks } from "@/features/books/lib/selectBook";
import useBookInfo from "@/features/books/hooks/useBookInfo";

export default function ReadingNow() {
	const userId = useAuthStore((s) => s.user?.auth.id);

	const {
		data: book,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["mostRecentlyReadBook", userId],
		queryFn: () => {
			if (!userId) throw new Error("User ID is missing");
			return getRecentlyOpenedBooks(userId, 1);
		},
		// enabled: !!userId,
	});

	const [coverPath, setCoverPath] = useState<string | null>(null);
	const [loadingCover, setLoadingCover] = useState<boolean>(true);

	useEffect(() => {
		if (!book) return;

		const fetchCover = async () => {
			setLoadingCover(true);
			try {
				const cover = book[0]?.coverImageUrl ?? null;
				setCoverPath(cover);
			} catch (err: any) {
				console.error("Error fetching cover: ", err);
			} finally {
				setLoadingCover(false);
			}
		};

		fetchCover();
	}, [book]);

	const isFullyloading = isLoading || loadingCover;
	const hasBook = !!book && !!book[0];

	if (isFullyloading) return <ReadingNowSkeleton />;
	if (error) {
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

			<ReadingNowDisplay book={book[0]} coverPath={coverPath} />
		</ReadingNowWrapper>
	);
}

const ReadingNowWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col">{children}</div>
);

//TODO: instead of coverpath, i want to use the current chapter you are in the book in like a book format reading view.
// see: https://www.google.com/search?client=opera&hs=4u5&sca_esv=999408e326bfc446&sxsrf=AHTn8zr11DkGdFT1uqAQY95s6KFPXBH-FA:1745042173239&q=apple+books&udm=2&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBteutRhCIwSdaS7of3GY5DTFLwljmhukYwLUB-yIwO6kn9ergnmIq2g-xQeCW-gxzb_MJbj4sdtmtN4T-SQ2hVvT9p8oMaJfKqTJ7Kfp2L_oYgjoAiqPMabOUU17pZcY9HKWPIFRIFBj1mhZurFoG9QCRjeN&sa=X&ved=2ahUKEwjAm-rWtOOMAxVpBNsEHVh5NRsQtKgLegQIGxAB&biw=1387&bih=905&dpr=1#vhid=I08o9eHgnmJ1OM&vssid=mosaic

// @ts-ignore
const ReadingNowDisplay = ({ book, coverPath }: { book: Book; coverPath: string | null }) => {
	const { progress, timeAgo } = useBookInfo(book, "percentage");

	return (
		<div className="flex flex-col w-full px-4">
			<header className="w-full h-min flex justify-center items-center min-h-32 select-none">
				<div className="relative select-none h-62 w-46">
					<Cover className="rounded-md w-full h-full">
						<CoverImage src={coverPath ?? PLACEHOLDER_RECENTLY_READ_URL} alt="cover" />
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
		{/* <div className="px-4 mb-2 w-64">
			<Skeleton />
		</div> */}
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
