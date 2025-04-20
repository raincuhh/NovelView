import { BOOKS_FOLDER, LOCAL_APPDATA } from "@/features/fs/consts";
import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import { exists } from "@tauri-apps/plugin-fs";

const coverCache: { [bookId: string]: string | null } = {};

export async function getBookCoverPath(bookId: string, fallbackUrl?: string) {
	if (coverCache[bookId]) return coverCache[bookId];

	const possibleExtensions = ["jpg", "png", "webp", "jpeg"];
	const baseDir = await appLocalDataDir();

	for (const ext of possibleExtensions) {
		try {
			const relativePath = `${BOOKS_FOLDER}/${bookId}/cover.${ext}`;
			const fullPath = await join(baseDir, relativePath);
			const fileExists = await exists(relativePath, { baseDir: LOCAL_APPDATA });

			if (fileExists) {
				const fileUrl = convertFileSrc(fullPath, "asset");

				coverCache[bookId] = fileUrl;
				return fileUrl;
			}
		} catch (err: any) {
			// do nothing, just loop next.
		}
	}

	if (fallbackUrl) {
		coverCache[bookId] = fallbackUrl;
		return fallbackUrl;
	}

	coverCache[bookId] = null;
	return null;
}
