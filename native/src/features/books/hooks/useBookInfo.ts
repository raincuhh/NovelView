import { getBookInfoByBookId } from "../lib/selectBook";
import { Book } from "../types";
import { useEffect, useState } from "react";
import { getTimeAgo } from "@/shared/lib/globalUtils";
//TODO: implement getting read count from book metadata

// TODO: getting chapters, chapters are set in book contents metadata.
// or filesystem /books/{bookId}/metadata.json;

const MOCK_CURRENT_CHAPTER = 54;

export type ProgressDisplay = "percentage" | "total" | "mix";

export default function useBookInfo(book: Book, progressDisplay: ProgressDisplay) {
	const [chapters, setChapters] = useState<number | null>(null);
	const [progress, setProgress] = useState<string | null>(null);
	const [timeAgo, setTimeAgo] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		let cancelled = false;

		const fetchBookInfo = async () => {
			setIsLoading(true);
			try {
				const bookInfo = await getBookInfoByBookId(book.id);
				const metadata = bookInfo?.metadata;
				if (!metadata || cancelled) return;

				const chapterCount = metadata?.spine?.length ?? 0;
				setChapters(chapterCount);

				// TODO: replace this shit later with actual progress logic.. ion even got currentChapter rn

				const currentChapter = MOCK_CURRENT_CHAPTER;
				const percent = chapterCount ? (currentChapter / chapterCount) * 100 : 0;

				switch (progressDisplay) {
					case "total":
						setProgress(`${currentChapter}/${chapterCount}`);
						break;
					case "percentage":
						setProgress(`${percent.toFixed(0)}%`);
						break;
					case "mix":
						setProgress(`${currentChapter}/${chapterCount} (${percent.toFixed(0)}%)`);
						break;
				}

				if (book.lastReadAt) {
					setTimeAgo(getTimeAgo(new Date(book.lastReadAt)));
				}
			} catch (err: any) {
				console.error("Error fetching book info: ", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBookInfo();

		return () => {
			cancelled = true;
		};
	}, [book, progressDisplay]);

	return {
		progress,
		chapters,
		timeAgo,
		isLoading,
	};
}
