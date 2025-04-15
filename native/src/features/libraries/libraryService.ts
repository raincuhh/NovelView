import { create, mkdir, writeFile } from "@tauri-apps/plugin-fs";
import { LIBRARIES_FOLDER, LOCAL_APPDATA } from "../filesystem/consts";
import { sanitizeAndHyphenate } from "@/shared/lib/globalUtils";
import { db } from "@/shared/providers/systemProvider"; // this is powersync db
import { LibraryType } from "./types";
import { convertFileSrc } from "@tauri-apps/api/core";
import { resolve } from "@tauri-apps/api/path";

type createLibraryProps = {
	name: string;
	cover: File | null;
	type: LibraryType;
	userId: string;
	description?: string;
};

export async function createLibrary({ name, cover, type, userId, description }: createLibraryProps) {
	const folderName = sanitizeAndHyphenate(name);
	const localDir = `${LIBRARIES_FOLDER}/${folderName}`;
	try {
		await mkdir(localDir, { baseDir: LOCAL_APPDATA });
		await createLibraryMetadata(localDir, { name, type });

		let coverUrl: string | null = null;

		if (cover) {
			const fileExtension = cover.name.split(".").pop();
			const coverFileName = `cover.${fileExtension}`;
			const coverPath = `${localDir}/${coverFileName}`;

			await saveLibraryCover(localDir, cover);

			if (type === "sync") {
			} else {
				coverUrl = coverPath;
			}
		}

		await db.writeTransaction(async (tx) => {
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
				) VALUES (uuid(), ?, ?, ?, ?, ?, datetime(), datetime())`,
				[userId, name, description, coverUrl, type]
			);
		});
	} catch (err: any) {
		console.error("Error creating library:", err);
	}
}

export async function createLibraryMetadata(
	libraryDir: string,
	{ name, type }: { name: string; type: LibraryType }
) {
	const metadata = {
		name,
		created_at: new Date().toISOString(),
		type: type,
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
	const folderPath = `${LIBRARIES_FOLDER}/${libraryId}`;
	const possibleExtensions = ["jpg", "png", "webp", "jpeg"];

	for (const ext of possibleExtensions) {
		try {
			const path = await resolve(folderPath, `cover.${ext}`);

			console.log(path);
			return convertFileSrc(path);
		} catch (err: any) {
			// we dont do anything here, just retry for all possible extensions.
		}
	}

	if (fallbackUrl) return fallbackUrl;

	return null;
}
