import { useQuery } from "@tanstack/react-query";
import { getFirstLibrary } from "@/features/libraries/lib/selectLibraries";
import { getBookInfoByBookId, getBooksByLibraryId, getRecentlyOpenedBooks } from "../../lib/selectBook";

const DEFAULT_REFETCH_INTERVAL = 60 * 1000;

export const useUserFirstLibraryQuery = (userId: string) => {
	return useQuery({
		queryKey: ["library", userId],
		queryFn: () => getFirstLibrary(userId),
		enabled: !!userId,
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});
};

export const useMostRecentlyOpenedBookQuery = (userId: string) => {
	return useQuery({
		queryKey: ["mostRecentlyReadBook", userId],
		queryFn: () => getRecentlyOpenedBooks(userId, 1),
		enabled: !!userId,
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});
};

export const useRecentlyOpenedBooksQuery = (userId: string, limit: number = 16) => {
	return useQuery({
		queryKey: ["mostRecentlyReadBooks", userId],
		queryFn: () => getRecentlyOpenedBooks(userId, limit),
		enabled: !!userId,
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});
};

export const useBookInfoQuery = (bookId: string) => {
	return useQuery({
		queryKey: ["bookInfo", bookId],
		queryFn: () => getBookInfoByBookId(bookId),
		enabled: !!bookId,
	});
};

export const useBooksByLibraryIdQuery = (libraryId: string) => {
	return useQuery({
		queryKey: ["books", libraryId],
		queryFn: async () => getBooksByLibraryId(libraryId),
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});
};
