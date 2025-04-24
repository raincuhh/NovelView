import { BookMetadata } from "../books/types";
import { Chapter } from "../chapter/types";

export interface DownloadPayload {
	metadata: BookMetadata;
	chapters: Chapter[];
	chapterContents: Record<string, string>;
	images?: Record<string, Buffer>;
}

export interface SourceMetadata {
	id: string;
	name: string;
	description?: string;
	websiteUrl: string;
	supportsSearch: boolean;
	supportsDownload: boolean;
}

export interface ISourceAdapter {
	metadata: SourceMetadata;

	// popular/recommended books
	fetchBookList(): Promise<BookMetadata[]>;

	// metadata + chapter + toc
	fetchBook(bookId: string): Promise<BookMetadata>;

	// fetch html of a specific chapter
	fetchChapterContent(bookId: string, chapterId: string): Promise<string>;

	// search by title, tag, author (optional per source)
	search?(query: string): Promise<BookMetadata[]>;

	// download everything for offline reading (optional per source aswell)
	downloadBook?(bookId: string): Promise<DownloadPayload>;

	// get cover as buffer, for caching.
	fetchCoverImageBuffer?(bookId: string): Promise<Buffer>;

	// external id to internal book id map.
	resolveBookIdFromExternal?(externalId: string): Promise<string>;

	// Cleanup tasks (optional for long lived scraper instances)
	cleanup?(): void | Promise<void>;
}
