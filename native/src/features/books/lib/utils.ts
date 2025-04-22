import { BOOKS_FOLDER } from "@/features/fs/consts";
import { getCoverPath } from "@/shared/lib/fs/getCoverPath";
import { LOCAL_BOOK_COVER_PATH_TEMPLATE, REMOTE_BOOK_COVER_PATH_TEMPLATE } from "../const";

const bookCoverCache: Record<string, string | null> = {};

export async function getBookCoverPath(bookId: string, fallbackUrl?: string) {
	return getCoverPath(bookId, BOOKS_FOLDER, bookCoverCache, fallbackUrl);
}

/**
 * used only for getting local template path, /books/{bookId}/cover.{ext}
 * does not return a usable cover url. use getBookCoverPath for that.
 * @param bookId
 * @param ext
 * @returns Local file path in the format books/{bookId}/cover.{ext}
 */
export function getLocalBookCoverPath(bookId: string, ext: string): string {
	return LOCAL_BOOK_COVER_PATH_TEMPLATE.replace("{bookId}", bookId).replace("{ext}", ext);
}

/**
 * used only for getting remote template path, /{bookId}/cover.{ext}
 * @param bookId
 * @param ext
 * @returns Remote path in the format {bookId}/cover.{ext}
 */
export function getRemoteBookCoverPath(bookId: string, ext: string): string {
	return REMOTE_BOOK_COVER_PATH_TEMPLATE.replace("{bookId}", bookId).replace("{ext}", ext);
}
