import { exists, mkdir } from "@tauri-apps/plugin-fs";
import { LIBRARIES_FOLDER, LOCAL_APPDATA } from "@/features/fs/consts";
import { powersyncDb, localDb } from "@/shared/providers/systemProvider";
import { Library, LibraryType } from "../types";
import {
	createLibraryMetadata,
	getLocalLibraryCoverPath,
	getRemoteLibraryCoverPath,
	libraryFolderExists,
	mapLibraryRow,
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
 * start process of syncing missing remote libraries to local appdata.
 */

export async function syncMissingLibraries(
	remoteLibraries: Library[],
	userId: string,
	queue: LibraryCoversAttachmentQueue
) {
	for (const rawLibrary of remoteLibraries) {
		const library = mapLibraryRow(rawLibrary);
		await ensureLibraryExists(library, userId, queue);
	}
}

export async function ensureLibraryExists(
	library: Library,
	userId: string,
	queue: LibraryCoversAttachmentQueue
) {
	const folderExists = await libraryFolderExists(library.id);

	if (!folderExists) {
		const localDir = `${LIBRARIES_FOLDER}/${library.id}`;
		await mkdir(localDir, { baseDir: LOCAL_APPDATA });
		await queue.tryDownloadCover(library, userId);
		await createLibraryMetadata(localDir, {
			name: library.name,
			type: library.type,
			coverUrl: library.coverUrl ?? null,
		});
	} else {
		await ensureCoverExists(queue, library, userId);
		await ensureMetadataExists(library);
	}
}

async function ensureCoverExists(queue: LibraryCoversAttachmentQueue, library: Library, userId: string) {
	if (!library.coverUrl) return;

	const ext = library.coverUrl.split(".").pop() || "jpg";
	const localCoverPath = getLocalLibraryCoverPath(library.id, ext);
	const existsCover = await exists(localCoverPath, { baseDir: LOCAL_APPDATA });

	if (!existsCover) {
		const remotePath = getRemoteLibraryCoverPath(userId, library.id, ext);
		await queue.downloadAttachment(localCoverPath, library.id, remotePath);
	}
}

async function ensureMetadataExists(library: Library) {
	const metadataPath = `${LIBRARIES_FOLDER}/${library.id}/metadata.json`;
	const metadataExists = await exists(metadataPath, { baseDir: LOCAL_APPDATA });

	if (!metadataExists) {
		await createLibraryMetadata(`${LIBRARIES_FOLDER}/${library.id}`, {
			name: library.name,
			type: library.type,
			coverUrl: library.coverUrl ?? null,
		});
	}
}
