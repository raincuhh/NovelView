import { localDb, powersyncDb } from "@/shared/providers/systemProvider";
import { Book } from "../type";

export async function getBooksByLibraryId(libraryId: string): Promise<Book[]> {
	const query = `SELECT * FROM books WHERE library_id = ?`;
	const [localRes, remoteRes] = await Promise.all([
		localDb.select<Book[]>(query, [libraryId]),
		powersyncDb.execute(query, [libraryId]),
	]);

	return [...(localRes ?? []), ...(remoteRes.rows?._array ?? [])];
}

export async function getAllBooksByUserId(userId: string): Promise<Book[]> {
	const query = `SELECT * FROM books WHERE user_id = ?`;
	const [localRes, remoteRes] = await Promise.all([
		localDb.select<Book[]>(query, [userId]),
		powersyncDb.execute(query, [userId]),
	]);

	return [...(localRes ?? []), ...(remoteRes.rows?._array ?? [])];
}

export async function getRecentlyOpenedBooks(userId: string, limit: number = 5): Promise<Book[]> {
	const query = `
		SELECT b.*
		FROM books b
		LEFT JOIN book_state bs ON b.id = bs.book_id
		WHERE b.id = ?
		ORDER BY bs.last_opened_at DESC
		LIMIT ?
	`;

	const [localRes, remoteRes] = await Promise.all([
		localDb.select<Book[]>(query, [userId, limit]),
		powersyncDb.execute(query, [userId, limit]),
	]);

	return [...(localRes ?? []), ...(remoteRes.rows?._array ?? [])];
}

export async function getBookCountByLibraryId(libraryId: string): Promise<number> {
	const query = `SELECT COUNT(*) AS count FROM books WHERE library_id = ?`;

	const [localCount, powersyncCount] = await Promise.all([
		localDb.select<{ count: number }[]>(query, [libraryId]),
		powersyncDb.execute(query, [libraryId]),
	]);

	const localRes = localCount?.[0]?.count ?? 0;
	const remoteRes = powersyncCount.rows?._array?.[0]?.count ?? 0;

	return localRes + remoteRes;
}

export async function getMostInteractedBooksInLibrary(libraryId: string, limit: number = 6): Promise<Book[]> {
	const query = `
		SELECT b.*, MAX(bs.last_opened_at) AS lastOpened
		FROM books b
		LEFT JOIN book_state bs ON b.id = bs.book_id
		WHERE b.library_id = ?
		GROUP BY b.id
		ORDER BY lastOpened DESC
		LIMIT ?
	`;

	const [localRes, remoteRes] = await Promise.all([
		localDb.select<Book[]>(query, [libraryId, limit]),
		powersyncDb.execute(query, [libraryId, limit]),
	]);

	return [...(localRes ?? []), ...(remoteRes.rows?._array ?? [])];
}
