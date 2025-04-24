import { Timestamp } from "@/shared/lib/types";

export interface Chapter {
	id: string;
	bookId: string;
	index: number; // reading order (0 based)
	resourceUrl?: string; // maps to /$appdata/books/{bookId}/resources/{resourceId}/parsed.{ext};
	sourceHref?: string; // if you imported/saved a novel from project gutenberg or royalroad.
	title?: string;
	snippet?: string; // used for readingNow in /home.
	wordCount?: number; // optional word count.
	estimatedReadingTime?: number; // estimated reading time.
	isRead?: boolean;
	isDownloaded?: boolean;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}
