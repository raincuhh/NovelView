import { useQuery } from "@tanstack/react-query";
import { getFirstLibrary } from "@/features/libraries/lib/selectLibraries";
import { getBookInfoByBookId, getRecentlyOpenedBooks } from "../../lib/selectBook";

const DEFAULT_REFETCH_INTERVAL = 60 * 1000;

export const useUserFirstLibraryQuery = (userId?: string) => {
	return useQuery({
		queryKey: ["library", userId],
		queryFn: () => {
			if (!userId) throw new Error("User ID is missing");
			return getFirstLibrary(userId);
		},
		enabled: !!userId,
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});
};

export const useMostRecentlyOpenedBookQuery = (userId?: string) => {
	return useQuery({
		queryKey: ["mostRecentlyReadBook", userId],
		queryFn: () => {
			if (!userId) throw new Error("User ID is missing");
			return getRecentlyOpenedBooks(userId, 1);
		},
		enabled: !!userId,
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});
};

export const useBookInfoQuery = (bookId?: string) => {
	return useQuery({
		queryKey: ["bookInfo", bookId],
		queryFn: () => {
			if (!bookId) throw new Error("Book ID is missing");
			return getBookInfoByBookId(bookId);
		},
		enabled: !!bookId,
	});
};
