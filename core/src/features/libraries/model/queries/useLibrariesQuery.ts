// import { useSuspenseQuery } from "@tanstack/react-query";
import { getMostInteractedLibraries, getLibraryById, getAllLibraries } from "../../lib/selectLibraries";
import { getLibraryCoverPath } from "../../lib/utils";
import { useSuspenseQuery } from "@powersync/tanstack-react-query";

/**
 *
 */
export const useLibraryByIdQuery = (libraryId: string) => {
	return useSuspenseQuery({
		queryKey: ["library", libraryId],
		queryFn: () => getLibraryById(libraryId),
	});
};

/**
 * Used for fetching most interacted libraries,
 * in stuff like libraries and home quickaccess.
 */
export const useMostInteractedLibrariesQuery = (userId: string) => {
	return useSuspenseQuery({
		queryKey: ["mostInteractedLibraries", userId],
		queryFn: () => getMostInteractedLibraries(userId),
	});
};

/**
 * fetch all libraries from remote and locally.
 */
export const useAllLibrariesQuery = (userId: string) => {
	return useSuspenseQuery({
		queryKey: ["allLibraries", userId],
		queryFn: () => getAllLibraries(userId),
	});
};

/**
 * for fetching a specific librarys coverpath.
 */
export const useLibraryCoverPath = (libraryId: string) =>
	useSuspenseQuery({
		queryKey: ["libraryCoverPath", libraryId],
		queryFn: () => getLibraryCoverPath(libraryId),
		staleTime: Infinity,
	});
