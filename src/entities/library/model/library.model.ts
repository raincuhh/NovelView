export type LibraryType = {
   libraryId: string;
   userId?: string;
   name: string;
   desc?: string;
   tags?: string;
   syncStatus: "local" | "synced";
   createdAt: string;
};
