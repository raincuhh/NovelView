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

export type MostInteractedLibrary = Pick<Library, "id" | "name" | "coverUrl" | "type">;
