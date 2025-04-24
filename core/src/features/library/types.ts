export type LibrarySortOption = "custom" | "title" | "chapters" | "recentlyAdded" | "external";

export type LibraryLayoutOption = "grid" | "gridCompact" | "list" | "listCompact";

export interface LibrarySettings {
	sort: LibrarySortOption;
	layout: LibraryLayoutOption;
}
