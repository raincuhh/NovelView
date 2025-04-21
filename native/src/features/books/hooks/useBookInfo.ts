import { getBookInfoByBookId } from "../lib/selectBook";
import { Book } from "../types";
import { useEffect, useState } from "react";
import { getTimeAgo } from "@/shared/lib/globalUtils";
import { useQuery } from "@tanstack/react-query";
//TODO: implement getting read count from book metadata

// TODO: getting chapters, chapters are set in book contents metadata.
// or filesystem /books/{bookId}/metadata.json;

const MOCK_CURRENT_CHAPTER = 54;

export type ProgressDisplay = "percentage" | "total" | "mix";

export default function useBookInfo(book: Book, progressDisplay: ProgressDisplay) {
	const [chapters, setChapters] = useState<number | null>(null);
	const [progress, setProgress] = useState<string | null>(null);
	const [timeAgo, setTimeAgo] = useState<string | null>(null);

	const {
		data: bookInfo,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["bookInfo", book.id],
		queryFn: () => getBookInfoByBookId(book.id),
		enabled: !!book?.id,
	});

	useEffect(() => {
		if (!bookInfo?.metadata) return;

		const metadata = bookInfo.metadata;
		const chapterCount = metadata.spine?.length ?? 0;
		setChapters(chapterCount);

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
	}, [bookInfo, book.lastReadAt, progressDisplay]);

	return {
		progress,
		chapters,
		timeAgo,
		isLoading,
		error,
	};
}
