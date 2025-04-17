import { Library } from "@/shared/lib/appSchema";
import { localDb, powersyncDb } from "@/shared/providers/systemProvider";
import { MostInteractedLibrary } from "../types";

export async function getCombinedLibraries(userId: string): Promise<Library[]> {
	const powersyncLibraries = await powersyncDb.execute(`SELECT * FROM libraries WHERE user_id = ?`, [
		userId,
	]);

	const localLibraries = await localDb.select<Library[]>(`SELECT * FROM libraries WHERE user_id = ?`, [
		userId,
	]);

	return [...(localLibraries ?? []), ...(powersyncLibraries.rows?._array ?? [])];
}

export async function getCombinedMostInteractedLibraries(userId: string): Promise<MostInteractedLibrary[]> {
	const query = `
    SELECT l.id, l.name, l.cover_url,
      (SELECT COUNT(*) FROM books b WHERE b.library_id = l.id) as read_count
    FROM libraries l
    WHERE l.user_id = ?
    GROUP BY l.id
    ORDER BY read_count DESC
    LIMIT 6
  `;

	const [local, powersync] = await Promise.all([
		localDb.select<MostInteractedLibrary[]>(query, [userId]),
		powersyncDb.execute(query, [userId]),
	]);

	return [...(local ?? []), ...((powersync.rows?._array as MostInteractedLibrary[]) ?? [])];
}

export async function getFirstLibrary(userId: string): Promise<Library | null> {
	const powersyncLibraries = await powersyncDb.execute(`SELECT * FROM libraries WHERE user_id = ? LIMIT 1`, [
		userId,
	]);

	const localLibraries = await localDb.select<Library[]>(
		`SELECT * FROM libraries WHERE user_id = ? LIMIT 1`,
		[userId]
	);

	if (powersyncLibraries && powersyncLibraries.rows?._array && powersyncLibraries.rows._array.length > 0) {
		return powersyncLibraries.rows._array[0];
	}

	if (localLibraries.length > 0) {
		return localLibraries[0];
	}

	return null;
}

export async function getLibraryById(libraryId: string): Promise<Library | null> {
	const powersyncResult = await powersyncDb.execute(`SELECT * FROM libraries WHERE id = ? LIMIT 1`, [
		libraryId,
	]);

	const powersyncLibrary = powersyncResult.rows?._array?.[0];
	if (powersyncLibrary) {
		return powersyncLibrary as Library;
	}

	const localLibraries = await localDb.select<Library[]>(`SELECT * FROM libraries WHERE id = ? LIMIT 1`, [
		libraryId,
	]);

	if (localLibraries && localLibraries.length > 0) {
		return localLibraries[0];
	}

	return null;
}
