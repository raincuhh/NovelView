import { mkdir } from "@tauri-apps/plugin-fs";
import { BOOKS_FOLDER, LOCAL_APPDATA } from "@/features/fs/consts";
import { Book } from "../types";
import { BookFilesAttachmentQueue } from "@/shared/lib/powersync/bookFilesAttachmentQueue";
import { getFileExtension } from "@/shared/lib/globalUtils";
import { fileToBase64 } from "@/shared/lib/fs/fileToBase64";
import { getLocalSourceFileName, getRemoteBookSourceFilePath, localSaveSourceFile } from "./utils";
import Database from "@tauri-apps/plugin-sql";
import { PowerSyncDatabase, Transaction } from "@powersync/web";
import { localDb, powersyncDb } from "@/shared/providers/systemProvider";

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

		const sourceUrl = sync
			? await uploadFileWithQueue(bookFilesQueue, file, localSourceFilePath, bookId, remoteSourceFilePath)
			: await saveLocalFile(bookId, file, localSourceFilePath);

		const newBook: Book = {
			id: bookId,
			userId,
			title: file.name.replace(/\.[^/.]+$/, ""),
			fileUrl: sourceUrl,
			format: fileExt,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		if (sync) {
			await powersyncDb.writeTransaction(async (tx) => insertBook(tx, newBook));
		} else {
			insertBook(localDb, newBook);
		}
	} catch (err: any) {
		console.error("Error importing new book: ", err);
	}
}

async function uploadFileWithQueue(
	queue: BookFilesAttachmentQueue,
	file: File,
	localPath: string,
	bookId: string,
	remotePath: string
): Promise<string> {
	const base64Data = await fileToBase64(file);
	const attachment = await queue.saveAttachment(base64Data, localPath, bookId, remotePath);
	console.log("File uploaded:", attachment);
	return bookId;
}

async function saveLocalFile(bookId: string, file: File, localPath: string): Promise<string> {
	await localSaveSourceFile(bookId, file);
	console.log("Local file saved at:", localPath);
	return localPath;
}

type ExecutableDb = Pick<Database | PowerSyncDatabase | Transaction, "execute">;

function insertBook(db: ExecutableDb, book: Book) {
	db.execute(
		`INSERT INTO books (
      id, user_id, title, file_url, format, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
		[book.id, book.userId, book.title, book.fileUrl, book.format, book.createdAt, book.updatedAt]
	);
}
