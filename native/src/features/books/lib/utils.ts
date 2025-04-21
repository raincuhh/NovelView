import { BOOKS_FOLDER } from "@/features/fs/consts";

import { getCoverPath } from "@/shared/lib/fs/getCoverPath";

const bookCoverCache: Record<string, string | null> = {};

export async function getBookCoverPath(bookId: string, fallbackUrl?: string) {
	return getCoverPath(bookId, BOOKS_FOLDER, bookCoverCache, fallbackUrl);
}
