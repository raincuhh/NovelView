export type BookType = {
   bookId: string;
   userId?: string;
   title: string;
   author?: string;
   addedAt: string;
   metadata?: string;
   tags?: string;
   desc?: string;
   fileUrl: string;
   syncStatus: "local" | "synced";
   createdAt: string;
};
