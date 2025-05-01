import { useSuspenseQuery } from "@tanstack/react-query";
import { getMostInteractedLibraries, getLibraryById } from "../../lib/selectLibraries";
import { getLibraryCoverPath } from "../../lib/utils";

export const useLibraryByIdQuery = (libraryId: string) => {
	return useSuspenseQuery({
		queryKey: ["library", libraryId],
		queryFn: () => getLibraryById(libraryId),
		staleTime: 1000 * 60 * 5,
	});
};

export const useMostInteractedLibrariesQuery = (userId: string) => {
	return useSuspenseQuery({
		queryKey: ["mostInteractedLibraries", userId],
		queryFn: () => {
			if (!userId) throw new Error("User ID is missing");
			return getMostInteractedLibraries(userId);
		},
	});
};

export const useLibraryCoverPath = (libraryId: string) =>
	useSuspenseQuery({
		queryKey: ["libraryCoverPath", libraryId],
		queryFn: () => getLibraryCoverPath(libraryId),
		staleTime: Infinity,
	});
