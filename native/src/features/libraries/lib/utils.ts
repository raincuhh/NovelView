import { LIBRARIES_FOLDER, LOCAL_APPDATA } from "@/features/fs/consts";
import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import { create, exists, writeFile } from "@tauri-apps/plugin-fs";
import { SUPABASE_LIBRARIES_COVER_PATH_TEMPLATE } from "../consts";
import { LibraryType } from "../types";

export async function saveLibraryCover(libraryId: string, cover: File) {
	try {
		const fileBytes = await cover.arrayBuffer();
		const fileExtension = cover.name.split(".").pop();

		if (!fileExtension) throw new Error("Cover file has no extension.");

		const coverFilePath = `${LIBRARIES_FOLDER}/${libraryId}/cover.${fileExtension}`;

		await writeFile(coverFilePath, new Uint8Array(fileBytes), { baseDir: LOCAL_APPDATA });
	} catch (err: any) {
		console.error("Error saving cover:", err);
	}
}

const coverCache: { [libraryId: string]: string | null } = {};

export async function getLibraryCoverPath(libraryId: string, fallbackUrl?: string): Promise<string | null> {
	if (coverCache[libraryId]) return coverCache[libraryId];

	const possibleExtensions = ["jpg", "png", "webp", "jpeg"];
	const baseDir = await appLocalDataDir();

	for (const ext of possibleExtensions) {
		try {
			const relativePath = `${LIBRARIES_FOLDER}/${libraryId}/cover.${ext}`;
			const fullPath = await join(baseDir, relativePath);
			const fileExists = await exists(relativePath, { baseDir: LOCAL_APPDATA });

			if (fileExists) {
				const fileUrl = convertFileSrc(fullPath, "asset");

				coverCache[libraryId] = fileUrl;
				return fileUrl;
			}
		} catch (err: any) {
			// do nothing
		}
	}

	if (fallbackUrl) {
		coverCache[libraryId] = fallbackUrl;
		return fallbackUrl;
	}

	coverCache[libraryId] = null;
	return null;
}

export function clearCoverCache(libraryId: string) {
	delete coverCache[libraryId];
}

export function getSupabaseLibraryCoverPath(libraryId: string, ext: string): string {
	return SUPABASE_LIBRARIES_COVER_PATH_TEMPLATE.replace("{libraryId}", libraryId).replace("{ext}", ext);
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
