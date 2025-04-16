export type LibraryType = "sync" | "local";
export type MostInteractedLibrary = {
	id: string;
	name: string;
	cover_url: string | null;
	read_count: number;
};
