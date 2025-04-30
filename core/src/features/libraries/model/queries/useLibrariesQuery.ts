import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getMostInteractedLibraries, getLibraryById } from "../../lib/selectLibraries";

export const useLibraryByIdQuery = (libraryId: string) => {
	return useSuspenseQuery({
		queryKey: ["library", libraryId],
		queryFn: () => getLibraryById(libraryId),
		staleTime: 1000 * 60 * 5,
		// cacheTime: 1000 * 60 * 10,
		// enabled: !!libraryId,
	});
};

export const useMostInteractedLibrariesQuery = (userId: string) => {
	return useQuery({
		queryKey: ["mostInteractedLibraries", userId],
		queryFn: () => {
			if (!userId) throw new Error("User ID is missing");
			return getMostInteractedLibraries(userId);
		},
		enabled: !!userId,
	});
};
