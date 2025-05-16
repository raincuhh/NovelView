import { mkdir } from "@tauri-apps/plugin-fs";
import { LIBRARIES_FOLDER, LOCAL_APPDATA } from "@/features/fs/consts";
import { powersyncDb, localDb } from "@/shared/providers/systemProvider";
import { Library, LibraryType } from "../types";
import {
	createLibraryMetadata,
	getLocalLibraryCoverPath,
	getRemoteLibraryCoverPath,
	libraryFolderExists,
	saveLibraryCover,
} from "./utils";
import Database from "@tauri-apps/plugin-sql";
import { PowerSyncDatabase, Transaction } from "@powersync/web";
import { LibraryCoversAttachmentQueue } from "@/shared/lib/powersync/libraryCoversAttachmentQueue";
import { fileToBase64 } from "@/shared/lib/fs/fileToBase64";
import { getFileExtension } from "@/shared/lib/globalUtils";

type CreateNewLibraryProps = {
	name: string;
	cover: File | null;
	type: LibraryType;
	userId: string;
	description?: string;
	libraryCoversQueue: LibraryCoversAttachmentQueue;
};

export async function createNewLibrary({
	name,
	cover,
	type,
	userId,
	description,
	libraryCoversQueue,
}: CreateNewLibraryProps) {
	const id = crypto.randomUUID();
	const localDir = `${LIBRARIES_FOLDER}/${id}`;

	try {
		await mkdir(localDir, { baseDir: LOCAL_APPDATA });

		let coverUrl: string | null = null;

		if (cover && type === "synced") {
			const base64Data = await fileToBase64(cover);
			// 			const arrayBuffer = await cover.arrayBuffer();
			// const uint8Array = new Uint8Array(arrayBuffer);
			const fileExtension = getFileExtension(cover.name);
			const fileName = `${id}.${fileExtension}`;
			const localFilePath = getLocalLibraryCoverPath(id, fileExtension);
			const remotePath = getRemoteLibraryCoverPath(userId, id, fileExtension);

			const attachment = await libraryCoversQueue.saveAttachment(
				base64Data,
				localFilePath,
				fileName,
				remotePath
			);
			coverUrl = fileName;
			console.log("file info: ", attachment);
		} else if (cover && type === "local") {
			const fileExtension = cover.name.split(".").pop();
			const coverFileName = `cover.${fileExtension}`;
			const coverPath = `${localDir}/${coverFileName}`;
			await saveLibraryCover(id, cover);
			coverUrl = coverPath;
			console.log("cover path: ", coverUrl);
		}

		await createLibraryMetadata(localDir, { name, type, coverUrl });

		const data: LibraryInsertData = {
			id,
			userId,
			name,
			description,
			coverUrl,
			type,
		};

		if (type === "synced") {
			await powersyncDb.writeTransaction(async (tx) => insertLibrary(tx, data));
		} else {
			insertLibrary(localDb, data);
		}
	} catch (err: any) {
		console.error("Error creating library: ", err);
	}
}

type LibraryInsertData = {
	id: string;
	userId: string;
	name: string;
	description?: string;
	coverUrl: string | null;
	type: LibraryType;
};

type ExecutableDb = Pick<Database | PowerSyncDatabase | Transaction, "execute">;

function insertLibrary(db: ExecutableDb, data: LibraryInsertData) {
	const { id, userId, name, description, coverUrl, type } = data;

	db.execute(
		`INSERT INTO libraries (
			id, user_id, name, description, cover_url, type, created_at, updated_at
		) VALUES (?, ?, ?, ?, ?, ?, datetime(), datetime())`,
		[id, userId, name, description, coverUrl, type]
	);
}

/**
 * Syncs missing libraries in the localappdata folders for libraries synced with powersync.
 *
 */

// async function syncMissingLibraries(remoteLibraries: Library[], userId: string) {
// 	for (const library of remoteLibraries) {
// 		const folderExists = await libraryFolderExists(library.id);
// 		if (!folderExists) {
// 			const localDir = `${LIBRARIES_FOLDER}/${library.id}`;
// 			await mkdir(localDir, { baseDir: LOCAL_APPDATA });

// 			if (library.coverUrl) {
// 				await downloadAndSaveLibraryCover(library, userId);
// 			}

// 			// Save metadata (like name, type, etc.)
// 			await createLibraryMetadata(localDir, {
// 				name: library.name,
// 				type: library.type,
// 				coverUrl: library.coverUrl ?? null,
// 			});

// 			console.log(`Library folder created for: ${library.name}`);
// 		}
// 	}
// }
