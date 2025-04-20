import { Book } from "@/shared/lib/appSchema";
import React, { useEffect, useState } from "react";

//TODO: implement getting read count from book metadata
const MOCK_READ_COUNT = 200;

// TODO: getting chapters, chapters are set in book contents metadata.
// or filesystem /books/{bookId}/metadata.json;

export type ProgressDisplay = "percentage" | "total" | "mix";

export default function useBookInfo(book: Book, progressDisplay: ProgressDisplay) {
	const [chapters, setChapters] = useState<number | string | null>(null);
	const [percentage, setPercentage] = useState<string | null>(null);
	const [progress, setProgress] = useState<string | null>(null);
	const [timeAgo, setTimeAgo] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		const setState = () => {
			switch (progressDisplay) {
				case "total":
					break;

				default:
					break;
			}
		};

		setState();
		setLoading(false);
	}, [book, progressDisplay]);

	return {};
}
