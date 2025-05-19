import { Library } from "../types";
import { localDb, powersyncDb } from "@/shared/providers/systemProvider";
import { MostInteractedLibrary } from "../types";

/**
 * fetches remote and local libraries.
 */
export async function getAllLibraries(userId: string): Promise<Library[]> {
	const query = `SELECT * FROM libraries WHERE user_id = ?`;

	const [localRes, powersyncRes] = await Promise.all([
		localDb.select<Library[]>(query, [userId]),
		powersyncDb.execute(query, [userId]),
	]);

	const abortController = new AbortController();

	powersyncDb.watch(query, [userId], { signal: abortController.signal });

	const remote = (powersyncRes?.rows?._array as Library[]) ?? [];
	return [...(localRes ?? []), ...remote];
}

/**
 * fetches local libraries.
 */
export async function getLocalLibraries(userId: string): Promise<Library[]> {
	const query = `SELECT * FROM libraries WHERE user_id = ?`;

	const localRes = localDb.select<Library[]>(query, [userId]);

	return localRes;
}

/**
 * fetches remote libraries
 */
export async function getRemoteLibraries(userId: string): Promise<Library[]> {
	const query = `SELECT * FROM libraries WHERE user_id = ?`;

	const remoteRes = powersyncDb.execute(query, [userId]);
	const remote = (await remoteRes).rows?._array as Library[];

	const abortController = new AbortController();

	powersyncDb.watch(query, [userId], { signal: abortController.signal });

	return remote;
}

export async function getMostInteractedLibraries(
	userId: string,
	limit: number = 8
): Promise<MostInteractedLibrary[]> {
	const query = `
		SELECT
			l.id,
			l.name,
			l.cover_url,
			l.type,
			MAX(b.last_opened_at) AS lastOpened
		FROM libraries l
		LEFT JOIN library_books lb ON lb.library_id = l.id
		LEFT JOIN books b ON b.id = lb.book_id
		WHERE l.user_id = ?
		GROUP BY l.id
		ORDER BY lastOpened DESC
	`;

	const abortController = new AbortController();

	powersyncDb.watch(query, [userId], { signal: abortController.signal });

	let [localRes, powersyncRes] = await Promise.all([
		localDb.select<MostInteractedLibrary[]>(query, [userId]),
		powersyncDb.getAll<MostInteractedLibrary>(query, [userId]),
	]);

	let remote = (powersyncRes as MostInteractedLibrary[]) ?? [];

	if ((!localRes || localRes.length === 0) && remote.length === 0) {
		const fallbackQuery = `
			SELECT
				id,
				name,
				cover_url,
				created_at AS lastOpened
			FROM libraries
			WHERE user_id = ?
			ORDER BY created_at DESC
		`;

		powersyncDb.watch(fallbackQuery, [userId], { signal: abortController.signal });

		const [fallbackLocal, fallbackRemote] = await Promise.all([
			localDb.select<MostInteractedLibrary[]>(fallbackQuery, [userId]),
			powersyncDb.execute(fallbackQuery, [userId]),
		]);

		return [
			...(fallbackLocal ?? []),
			...((fallbackRemote?.rows?._array as MostInteractedLibrary[]).slice(0, limit) ?? []),
		];
	}

	// console.log("Returning final result →", [...(localRes ?? []), ...remote]);
	return [...(localRes ?? []), ...remote].slice(0, limit);
}

export async function getFirstLibrary(userId: string): Promise<Library | null> {
	const query = `SELECT * FROM libraries WHERE user_id = ? LIMIT 1`;

	const [local, powersync] = await Promise.all([
		localDb.select<Library[]>(query, [userId]),
		powersyncDb.execute(query, [userId]),
	]);

	const remote = (powersync?.rows?._array as Library[]) ?? [];
	const libraries = [...(local ?? []), ...remote];

	return libraries.length > 0 ? libraries[0] : null;
}

export async function getLibraryById(libraryId: string): Promise<Library | null> {
	const query = `SELECT * FROM libraries WHERE id = ? LIMIT 1`;

	const [localRes, powersyncRes] = await Promise.all([
		localDb.select<Library[]>(query, [libraryId]),
		powersyncDb.execute(query, [libraryId]),
	]);

	const remoteLibrary = powersyncRes.rows?._array?.[0];
	const libraries = [...(localRes ?? []), remoteLibrary].filter(Boolean);

	return libraries.length > 0 ? libraries[0] : null;
}

export async function getLibrariesByBookId(bookId: string): Promise<Library[]> {
	const query = `
		SELECT l.*
		FROM libraries l
		INNER JOIN library_books lb ON lb.library_id = l.id
		WHERE lb.book_id = ?
	`;

	const [localRes, remoteRes] = await Promise.all([
		localDb.select<Library[]>(query, [bookId]),
		powersyncDb.execute(query, [bookId]),
	]);

	return [...(localRes ?? []), ...(remoteRes.rows?._array ?? [])];
}
