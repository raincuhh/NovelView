import { create, exists, mkdir, writeFile } from "@tauri-apps/plugin-fs";
import { LIBRARIES_FOLDER, LOCAL_APPDATA } from "../filesystem/consts";
import { powersyncDb, localDb } from "@/shared/providers/systemProvider";
import { LibraryType, MostInteractedLibrary } from "./types";
import { convertFileSrc } from "@tauri-apps/api/core";
import { join, appLocalDataDir } from "@tauri-apps/api/path";
import { Libraries } from "@/shared/lib/appSchema";

const coverCache: { [libraryId: string]: string | null } = {};

type createLibraryProps = {
	name: string;
	cover: File | null;
	type: LibraryType;
	userId: string;
	description?: string;
};

export async function createLibrary({ name, cover, type, userId, description }: createLibraryProps) {
	const id = crypto.randomUUID();
	const localDir = `${LIBRARIES_FOLDER}/${id}`;

	try {
		await mkdir(localDir, { baseDir: LOCAL_APPDATA });

		let coverUrl: string | null = null;

		if (cover) {
			const fileExtension = cover.name.split(".").pop();
			const coverFileName = `cover.${fileExtension}`;
			const coverPath = `${localDir}/${coverFileName}`;

			await saveLibraryCover(localDir, cover);

			if (type === "sync") {
				//TODO: implement uploading/ doing attatchmentqueue
				// to upload cover to supabase storage bucket.
			} else {
				coverUrl = coverPath;
			}
			console.log("cover path: ", coverUrl);
		}

		await createLibraryMetadata(localDir, { name, type, coverUrl });

		switch (type) {
			case "sync":
				await powersyncDb.writeTransaction(async (tx) => {
					tx.execute(
						`INSERT INTO libraries (
							id,
							user_id,
							name,
							description,
							cover_url,
							type,
							created_at,
							updated_at
						) VALUES (?, ?, ?, ?, ?, ?, datetime(), datetime())`,
						[id, userId, name, description, coverUrl, type]
					);
				});

				break;
			case "local":
				localDb.execute(
					`INSERT INTO libraries (
						id,
						user_id,
						name,
						description,
						cover_url,
						type,
						created_at,
						updated_at
					) VALUES (?, ?, ?, ?, ?, ?, datetime(), datetime())`,
					[id, userId, name, description, coverUrl, type]
				);

				break;
			default:
				throw new Error(`Unknown library type: ${type}`);
		}
	} catch (err: any) {
		console.error("Error creating library:", err);
	}
}

export async function createLibraryMetadata(
	libraryDir: string,
	{ name, type, coverUrl }: { name: string; type: LibraryType; coverUrl: string | null }
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

export async function saveLibraryCover(libraryDir: string, cover: File) {
	try {
		const fileBytes = await cover.arrayBuffer();
		const fileExtension = cover.name.split(".").pop();

		if (!fileExtension) throw new Error("Cover file has no extension.");

		const coverFilePath = `${libraryDir}/cover.${fileExtension}`;

		await writeFile(coverFilePath, new Uint8Array(fileBytes), { baseDir: LOCAL_APPDATA });
	} catch (err: any) {
		console.error("Error saving cover:", err);
	}
}

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

export async function getCombinedLibraries(userId: string): Promise<Libraries[]> {
	const powersyncLibraries = await powersyncDb.execute(`SELECT * FROM libraries WHERE user_id = ?`, [
		userId,
	]);

	const localLibraries = await localDb.select<Libraries[]>(`SELECT * FROM libraries WHERE user_id = ?`, [
		userId,
	]);

	return [...(localLibraries ?? []), ...(powersyncLibraries.rows?._array ?? [])];
}

export async function getCombinedMostInteractedLibraries(userId: string): Promise<MostInteractedLibrary[]> {
	const query = `
    SELECT l.id, l.name, l.cover_url,
      (SELECT COUNT(*) FROM books b WHERE b.library_id = l.id) as read_count
    FROM libraries l
    WHERE l.user_id = ?
    GROUP BY l.id
    ORDER BY read_count DESC
    LIMIT 6
  `;

	const [local, powersync] = await Promise.all([
		localDb.select<MostInteractedLibrary[]>(query, [userId]),
		powersyncDb.execute(query, [userId]),
	]);

	return [...(local ?? []), ...((powersync.rows?._array as MostInteractedLibrary[]) ?? [])];
}

export async function getFirstLibrary(userId: string): Promise<Libraries | null> {
	const powersyncLibraries = await powersyncDb.execute(`SELECT * FROM libraries WHERE user_id = ? LIMIT 1`, [
		userId,
	]);

	const localLibraries = await localDb.select<Libraries[]>(
		`SELECT * FROM libraries WHERE user_id = ? LIMIT 1`,
		[userId]
	);

	if (powersyncLibraries && powersyncLibraries.rows?._array && powersyncLibraries.rows._array.length > 0) {
		return powersyncLibraries.rows._array[0];
	}

	if (localLibraries.length > 0) {
		return localLibraries[0];
	}

	return null;
}
