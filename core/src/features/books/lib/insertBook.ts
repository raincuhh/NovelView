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

//TODO: bug: some kind of sync problem with library_books, and inserting into it and syncing from remote to the remote libs for some reason

type ImportNewBookProps = {
	file: File;
	userId: string;
	bookFilesQueue: BookFilesAttachmentQueue;
	sync: boolean;
	libraryId: string;
};

export async function importNewBook({ file, userId, bookFilesQueue, sync, libraryId }: ImportNewBookProps) {
	const bookId = crypto.randomUUID();
	const localDir = `${BOOKS_FOLDER}/${bookId}`;

	if (!libraryId) {
		throw new Error("Cannot import book: libraryId is undefined");
	}

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

		const newLibraryBookId = crypto.randomUUID();
		const now = new Date().toISOString();

		if (sync) {
			// console.log("About to insert with libraryId:", libraryId);
			await powersyncDb.writeTransaction(async (tx) => {
				// console.log("Inserting with libraryId:", libraryId);
				insertBook(tx, newBook);
				insertLibraryBook(tx, {
					id: newLibraryBookId,
					library_id: libraryId,
					book_id: bookId,
					created_at: now,
					updated_at: now,
				});
			});
		} else {
			console.log("inserting libraryBook and book for local");
			insertBook(localDb, newBook);
			insertLibraryBook(localDb, {
				id: newLibraryBookId,
				library_id: libraryId,
				book_id: bookId,
				created_at: now,
				updated_at: now,
			});
		}
	} catch (err: any) {
		// console.error("Error importing new book: ", err);
		console.error("Error importing new book: ", err.message, err.stack);
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

type LibraryBook = {
	id: string;
	library_id: string;
	book_id: string;
	created_at: string;
	updated_at: string;
};

function insertLibraryBook(db: ExecutableDb, entry: LibraryBook) {
	return db.execute(
		`INSERT INTO library_books (
      id, library_id, book_id, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?)`,
		[entry.id, entry.library_id, entry.book_id, entry.created_at, entry.updated_at]
	);
}
