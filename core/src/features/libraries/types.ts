import { Timestamp } from "@/shared/lib/types";

export type LibraryType = "local" | "synced";

// synced
export interface Library {
	id: string;
	userId: string;
	name: string;
	description?: string;
	coverUrl?: string;
	type: LibraryType;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface LibraryBooks {
	id: string;
	libraryId: string;
	bookId: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export type MostInteractedLibrary = Pick<Library, "id" | "name" | "coverUrl" | "type">;

export type LibrariesSortOption = "date" | "alphabetical";
export type LibrariesSortDirection = "asc" | "desc";
export type LibrariesLayoutOption = "grid" | "list";

export interface LibrariesSettings {
	sort: LibrariesSortOption;
	direction: LibrariesSortDirection;
	layout: LibrariesLayoutOption;
}
