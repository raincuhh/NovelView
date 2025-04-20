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

export async function getFullMostInteractedLibraries(
	userId: string,
	limit: number = 6
): Promise<MostInteractedLibrary[]> {
	const query = `
		SELECT
		l.id,
		l.name,
		l.cover_url,
		MAX(b.last_opened_at) AS lastOpened
		FROM libraries l
		LEFT JOIN books b ON b.library_id = l.id
		WHERE l.user_id = ?
		GROUP BY l.id
		ORDER BY lastOpened DESC
		LIMIT ${limit}
  `;

	const [localRes, powersyncRes] = await Promise.all([
		localDb.select<MostInteractedLibrary[]>(query, [userId]),
		powersyncDb.execute(query, [userId]),
	]);

	const remote = (powersyncRes?.rows?._array as MostInteractedLibrary[]) ?? [];
	return [...(localRes ?? []), ...remote];
}

export async function getFirstLibrary(userId: string): Promise<Library | undefined> {
	const query = `SELECT * FROM libraries WHERE user_id = ? LIMIT 1`;

	const [local, powersync] = await Promise.all([
		localDb.select<Library[]>(query, [userId]),
		powersyncDb.execute(query, [userId]),
	]);

	const remote = (powersync?.rows?._array as Library[]) ?? [];
	const libraries = [...(local ?? []), ...remote];

	return libraries.length > 0 ? libraries[0] : undefined;
}

export async function getLibraryById(libraryId: string): Promise<Library | undefined> {
	const query = `SELECT * FROM libraries WHERE id = ? LIMIT 1`;

	const [localRes, powersyncRes] = await Promise.all([
		localDb.select<Library[]>(query, [libraryId]),
		powersyncDb.execute(query, [libraryId]),
	]);

	const remoteLibrary = powersyncRes.rows?._array?.[0];
	const libraries = [...(localRes ?? []), remoteLibrary].filter(Boolean);

	return libraries.length > 0 ? libraries[0] : undefined;
}
