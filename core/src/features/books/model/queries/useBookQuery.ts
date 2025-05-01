import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getFirstLibrary } from "@/features/libraries/lib/selectLibraries";
import {
	getBookCountByLibraryId,
	getBookInfoByBookId,
	getBooksByLibraryId,
	getRecentlyOpenedBooks,
} from "../../lib/selectBook";
import { getBookCoverPath } from "../../lib/utils";

const DEFAULT_REFETCH_INTERVAL = 60 * 1000;

/**
 * mostly used to just handle if the user has any libraries at all in stuff like /home and /libraries
 */
export const useUserFirstLibraryQuery = (userId: string) => {
	return useSuspenseQuery({
		queryKey: ["library", userId],
		queryFn: () => getFirstLibrary(userId),
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});
};

export const useMostRecentlyOpenedBookQuery = (userId: string) => {
	return useSuspenseQuery({
		queryKey: ["mostRecentlyReadBook", userId],
		queryFn: () => getRecentlyOpenedBooks(userId, 1),
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
	return useSuspenseQuery({
		queryKey: ["books", libraryId],
		queryFn: async () => getBooksByLibraryId(libraryId),
		refetchInterval: DEFAULT_REFETCH_INTERVAL,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});
};

export const useBookCoverPath = (bookId: string) =>
	useSuspenseQuery({
		queryKey: ["bookCoverPath", bookId],
		queryFn: () => getBookCoverPath(bookId),
		staleTime: Infinity,
	});

export const useBookCountByLibraryIdQuery = (libraryId: string) => {
	return useSuspenseQuery({
		queryKey: ["bookCount", libraryId],
		queryFn: () => getBookCountByLibraryId(libraryId),
	});
};
