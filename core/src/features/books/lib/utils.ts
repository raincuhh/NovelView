import { BOOKS_FOLDER, LOCAL_APPDATA } from "@/features/fs/consts";
import { getCoverPath } from "@/shared/lib/fs/getCoverPath";
import {
	LOCAL_BOOK_COVER_PATH_TEMPLATE,
	LOCAL_BOOK_FILES_PATH_TEMPLATE,
	REMOTE_BOOK_COVER_PATH_TEMPLATE,
	REMOTE_BOOK_FILES_PATH_TEMPLATE,
	REMOTE_BOOK_SOURCE_FILE_PATH_TEMPLATE,
	LOCAL_BOOK_SOURCE_FILE_PATH_TEMPLATE,
} from "../const";
import { getFileExtension } from "@/shared/lib/globalUtils";
import { writeFile } from "@tauri-apps/plugin-fs";

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

export function getLocalBookFilesPath(bookId: string): string {
	return LOCAL_BOOK_FILES_PATH_TEMPLATE.replace("{bookId}", bookId);
}

export function getRemoteBookFilesPath(userId: string, bookId: string): string {
	return REMOTE_BOOK_FILES_PATH_TEMPLATE.replace("{userId}", userId).replace("{bookId}", bookId);
}

export function getRemoteBookSourceFilePath(userId: string, bookId: string, ext: string): string {
	return REMOTE_BOOK_SOURCE_FILE_PATH_TEMPLATE.replace("{userId}", userId)
		.replace("{bookId}", bookId)
		.replace("{ext}", ext);
}

export function getLocalBookSourceFilePath(bookId: string, ext: string): string {
	return LOCAL_BOOK_SOURCE_FILE_PATH_TEMPLATE.replace("{bookId}", bookId).replace("{ext}", ext);
}

export function getLocalSourceFileName(ext: string): string {
	return `source.${ext}`;
}

export async function localSaveSourceFile(bookId: string, file: File) {
	try {
		const fileBytes = await file.arrayBuffer();
		const ext = getFileExtension(file.name);

		if (!ext) throw new Error("source file has not extension.");

		const localSourceFilePath = getLocalBookSourceFilePath(bookId, ext);

		await writeFile(localSourceFilePath, new Uint8Array(fileBytes), { baseDir: LOCAL_APPDATA });
	} catch (err: any) {
		console.error("Error saving source file: ", err);
	}
}
