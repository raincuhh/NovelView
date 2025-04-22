import { LIBRARIES_FOLDER, LOCAL_APPDATA } from "@/features/fs/consts";
import { create, writeFile } from "@tauri-apps/plugin-fs";
import { LOCAL_LIBRARY_COVER_PATH_TEMPLATE, REMOTE_LIBRARY_COVER_PATH_TEMPLATE } from "../consts";
import { LibraryType } from "../types";
import { getCoverPath } from "@/shared/lib/fs/getCoverPath";

export async function saveLibraryCover(libraryId: string, cover: File) {
	try {
		const fileBytes = await cover.arrayBuffer();
		const ext = cover.name.split(".").pop();

		if (!ext) throw new Error("Cover file has no extension.");

		const coverFilePath = `${LIBRARIES_FOLDER}/${libraryId}/cover.${ext}`;

		await writeFile(coverFilePath, new Uint8Array(fileBytes), { baseDir: LOCAL_APPDATA });
	} catch (err: any) {
		console.error("Error saving cover:", err);
	}
}

const libraryCoverCache: { [libraryId: string]: string | null } = {};

export async function getLibraryCoverPath(libraryId: string, fallbackUrl?: string) {
	return getCoverPath(libraryId, LIBRARIES_FOLDER, libraryCoverCache, fallbackUrl);
}

export function clearCoverCache(libraryId: string) {
	delete libraryCoverCache[libraryId];
}

type CreateLibraryMetadata = { name: string; type: LibraryType; coverUrl: string | null };

export async function createLibraryMetadata(
	libraryDir: string,
	{ name, type, coverUrl }: CreateLibraryMetadata
) {
	const metadata = {
		name,
		created_at: new Date().toISOString(),
		type: type,
		cover_url: coverUrl,
	};

	const metadataJson = JSON.stringify(metadata);

	try {
		const file = await create(`${libraryDir}/metadata.json`, { baseDir: LOCAL_APPDATA });
		await file.write(new TextEncoder().encode(metadataJson));
		await file.close();
	} catch (err: any) {
		console.error("Error saving metadata:", err);
	}
}

export function getLocalLibraryCoverPath(libraryId: string, ext: string): string {
	return LOCAL_LIBRARY_COVER_PATH_TEMPLATE.replace("{libraryId}", libraryId).replace("{ext}", ext);
}

export function getRemoteLibraryCoverPath(libraryId: string, ext: string): string {
	return REMOTE_LIBRARY_COVER_PATH_TEMPLATE.replace("{libraryId}", libraryId).replace("{ext}", ext);
}
