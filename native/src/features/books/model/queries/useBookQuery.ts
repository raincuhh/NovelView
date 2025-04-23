import { useQuery } from "@tanstack/react-query";
import { getFirstLibrary } from "@/features/libraries/lib/selectLibraries";

export const useUserFirstLibraryQuery = (userId?: string) => {
	return useQuery({
		queryKey: ["library", userId],
		queryFn: () => {
			if (!userId) throw new Error("User ID is missing");
			return getFirstLibrary(userId);
		},
		enabled: !!userId,
		refetchInterval: 60 * 1000,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});
};
