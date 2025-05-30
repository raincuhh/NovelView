import { localDb, powersyncDb } from "@/shared/providers/systemProvider";
import { Book, BookInfo } from "../types";

export async function testLogStuff() {
	const results = await powersyncDb.getAll("SELECT * FROM books");
	const libraryBooks = await powersyncDb.getAll("SELECT * FROM library_books");
	console.log("All books:", results, "library_book table: ", libraryBooks);
}

export async function getBooksByLibraryId(libraryId: string): Promise<Book[]> {
	const query = `
		SELECT b.*
		FROM books b
		INNER JOIN library_books lb ON lb.book_id = b.id
		WHERE lb.library_id = ?
	`;

	const [localRes, remoteRes] = await Promise.all([
		localDb.select<Book[]>(query, [libraryId]),
		powersyncDb.getAll<Book>(query, [libraryId]),
	]);

	return [...(localRes ?? []), ...(remoteRes ?? [])];
}

export async function getAllBooksByUserId(userId: string): Promise<Book[]> {
	const query = `SELECT * FROM books WHERE user_id = ?`;
	const [localRes, remoteRes] = await Promise.all([
		localDb.select<Book[]>(query, [userId]),
		powersyncDb.getAll<Book>(query, [userId]),
	]);

	return [...(localRes ?? []), ...(remoteRes ?? [])];
}

export async function getRecentlyOpenedBooks(userId: string, limit: number = 5): Promise<Book[]> {
	const query = `
		SELECT *
		FROM books
		WHERE user_id = ?
		ORDER BY last_opened_at DESC
		LIMIT ?
	`;

	const [localRes, remoteRes] = await Promise.all([
		localDb.select<Book[]>(query, [userId, limit]),
		powersyncDb.execute(query, [userId, limit]),
	]);

	return [...(localRes ?? []), ...(remoteRes.rows?._array ?? [])];
}

export async function getBookCountByLibraryId(libraryId: string): Promise<number> {
	const query = `
		SELECT COUNT(*) AS count
		FROM books b
		INNER JOIN library_books lb ON lb.book_id = b.id
		WHERE lb.library_id = ?
	`;

	const [localCount, powersyncCount] = await Promise.all([
		localDb.select<{ count: number }[]>(query, [libraryId]),
		powersyncDb.execute(query, [libraryId]),
	]);

	const localRes = localCount?.[0]?.count ?? 0;
	const remoteRes = powersyncCount.rows?._array?.[0]?.count ?? 0;

	return localRes + remoteRes;
}

export async function getBookCountsForLibraries(
	userId: string
): Promise<{ libraryId: string; count: number }[]> {
	const query = `
		SELECT lb.library_id AS libraryId, COUNT(*) AS count
		FROM library_books lb
		INNER JOIN books b ON b.id = lb.book_id
		INNER JOIN libraries l ON l.id = lb.library_id
		WHERE l.user_id = ?
		GROUP BY lb.library_id
	`;

	const [localCounts, remoteCounts] = await Promise.all([
		localDb.select<{ libraryId: string; count: number }[]>(query, [userId]),
		powersyncDb.execute(query, [userId]),
	]);

	const remoteArray = (remoteCounts.rows?._array as { libraryId: string; count: number }[]) ?? [];
	return [...localCounts, ...remoteArray];
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

export async function getBookInfoByBookId(bookId: string): Promise<BookInfo | null> {
	const query = `SELECT * FROM book_info WHERE book_id = ?`;

	const [localRes, remoteRes] = await Promise.all([
		localDb.select<BookInfo[]>(query, [bookId]),
		powersyncDb.execute(query, [bookId]),
	]);

	const localMatch = localRes?.[0];
	const remoteMatch = remoteRes.rows?._array?.[0];

	// console.log({ localMatch, remoteMatch });

	return localMatch ?? remoteMatch ?? null;
}

export async function getRecentBooks(userId: string, limit: number = 10): Promise<Book[]> {
	const query = `
		SELECT b.*
		FROM books b
		WHERE b.user_id = ?
		ORDER BY b.created_at DESC
		LIMIT ?
	`;

	const [localRes, remoteRes] = await Promise.all([
		localDb.select<Book[]>(query, [userId, limit]),
		powersyncDb.execute(query, [userId, limit]),
	]);

	return [...(localRes ?? []), ...(remoteRes.rows?._array ?? [])];
}

export async function searchBooksInLibrary(libraryId: string, search: string): Promise<Book[]> {
	const query = `
		SELECT b.*
		FROM books b
		INNER JOIN library_books lb ON lb.book_id = b.id
		WHERE lb.library_id = ? AND b.title LIKE ?
	`;

	const searchPattern = `%${search}%`;

	const [localRes, remoteRes] = await Promise.all([
		localDb.select<Book[]>(query, [libraryId, searchPattern]),
		powersyncDb.execute(query, [libraryId, searchPattern]),
	]);

	return [...(localRes ?? []), ...(remoteRes.rows?._array ?? [])];
}
