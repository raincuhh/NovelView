import { Library } from "../types";
import { localDb, powersyncDb } from "@/shared/providers/systemProvider";
import { MostInteractedLibrary } from "../types";

export async function getAllLibraries(userId: string): Promise<Library[]> {
	const [localRes, powersyncRes] = await Promise.all([
		localDb.select<Library[]>(`SELECT * FROM libraries WHERE user_id = ?`, [userId]),
		powersyncDb.execute(`SELECT * FROM libraries WHERE user_id = ?`, [userId]),
	]);

	const remote = (powersyncRes?.rows?._array as Library[]) ?? [];
	return [...(localRes ?? []), ...remote];
}

export async function getMostInteractedLibraries(
	userId: string,
	limit: number = 6
): Promise<MostInteractedLibrary[]> {
	const query = `
		SELECT
			l.id,
			l.name,
			l.cover_url,
			l.type,
			MAX(b.last_opened_at) AS lastOpened
		FROM libraries l
		LEFT JOIN books b ON b.library_id = l.id
		WHERE l.user_id = ?
		GROUP BY l.id
		ORDER BY lastOpened DESC
		LIMIT ?
	`;

	let [localRes, powersyncRes] = await Promise.all([
		localDb.select<MostInteractedLibrary[]>(query, [userId, limit]),
		powersyncDb.execute(query, [userId, limit]),
	]);

	let remote = (powersyncRes?.rows?._array as MostInteractedLibrary[]) ?? [];

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
			LIMIT ?
		`;

		const [fallbackLocal, fallbackRemote] = await Promise.all([
			localDb.select<MostInteractedLibrary[]>(fallbackQuery, [userId, limit]),
			powersyncDb.execute(fallbackQuery, [userId, limit]),
		]);

		return [...(fallbackLocal ?? []), ...((fallbackRemote?.rows?._array as MostInteractedLibrary[]) ?? [])];
	}

	// console.log("Returning final result →", [...(localRes ?? []), ...remote]);
	return [...(localRes ?? []), ...remote];
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
