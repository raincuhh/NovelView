// important for how the parser parses the content

import { Metadata, Timestamp } from "@/shared/lib/types";

// and the structure of the content in appdata/books/{bookId}/
export type BookFormats = "epub" | "webnovel" | "lightnovel" | "pdf" | "txt" | "Kindle";

export type BookStatus = "ongoing" | "completed" | "hiatus";

// synced if the library id join library.type is sync.
export interface Book {
	id: string;
	userId: string;
	title: string;
	coverImageUrl?: string;
	fileUrl?: string; // path to file in /books/{bookId}/source.epub;
	format: BookFormats | string;

	createdAt: Timestamp;
	updatedAt: Timestamp;

	lastReadAt?: Timestamp;
}

// synced if book is synced, same business.
export interface BookInfo {
	id: string;
	bookId: string;
	parsingVersion: number; // if the parsing version is different, trigger a reparsing.
	metadata: BookMetadata;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface BookMetadata extends Metadata {
	bookId: string;
	author?: string;
	artist?: string;
	summary?: string;
	status?: BookStatus | string;
	language?: string;
	genres?: string[];
	tags?: string[];
	wordCount?: number;
	pageCount?: number;
	externalId?: string; // royalroadId/gutenbergId
	source?: string; // "RoyalRoad", "Gutenberg"
	spine?: string[]; // from epub structure
	metadataVersion?: number;

	updatedAt: Timestamp;
}
