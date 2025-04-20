import { create, exists, mkdir, writeFile } from "@tauri-apps/plugin-fs";
import { LIBRARIES_FOLDER, LOCAL_APPDATA } from "../filesystem/consts";
import { powersyncDb, localDb } from "@/shared/providers/systemProvider";
import { LibraryType } from "./types";
import { convertFileSrc } from "@tauri-apps/api/core";
import { join, appLocalDataDir } from "@tauri-apps/api/path";

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
				//TODO, actually dont need to do anything, cover always gonna be local
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
