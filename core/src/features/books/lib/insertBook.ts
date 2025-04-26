import { mkdir } from "@tauri-apps/plugin-fs";
import { BOOKS_FOLDER, LOCAL_APPDATA } from "@/features/fs/consts";
import { powersyncDb, localDb } from "@/shared/providers/systemProvider";
import { Book } from "../types";
import Database from "@tauri-apps/plugin-sql";
import { PowerSyncDatabase, Transaction } from "@powersync/web";
import { BookFilesAttachmentQueue } from "@/shared/lib/powersync/bookFilesAttachmentQueue";
import { getFileExtension } from "@/shared/lib/globalUtils";
import { fileToBase64 } from "@/shared/lib/fs/fileToBase64";
import { getLocalSourceFileName, getRemoteBookSourceFilePath, localSaveSourceFile } from "./utils";

type ImportNewBookProps = {
	file: File;
	userId: string;
	bookFilesQueue: BookFilesAttachmentQueue;
	sync: boolean;
};

export async function importNewBook({ file, userId, bookFilesQueue, sync }: ImportNewBookProps) {
	const bookId = crypto.randomUUID();
	const localDir = `${BOOKS_FOLDER}/${bookId}`;

	try {
		await mkdir(localDir, { baseDir: LOCAL_APPDATA });

		const fileExt = getFileExtension(file.name) || "epub";
		const localSourceFilePath = `${localDir}/${getLocalSourceFileName(fileExt)}`;
		const remoteSourceFilePath = getRemoteBookSourceFilePath(userId, bookId, fileExt);

		let sourceUrl: string | null = null;

		if (sync) {
			const base64Data = await fileToBase64(file);

			const attachment = await bookFilesQueue.saveAttachment(
				base64Data,
				localSourceFilePath,
				bookId,
				remoteSourceFilePath
			);

			sourceUrl = remoteSourceFilePath;
			console.log("source file attachment info: ", attachment);
		} else {
			await localSaveSourceFile(bookId, file);
			sourceUrl = localSourceFilePath;
			console.log("source path: ", localSourceFilePath);
		}
	} catch (err: any) {
		console.error("Error importing new book: ", err);
	}
}
