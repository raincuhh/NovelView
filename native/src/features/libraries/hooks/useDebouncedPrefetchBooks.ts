import { getBooksByLibraryId } from "@/features/books/lib/selectBook";
import { debounce } from "@/shared/lib/globalUtils";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export function useDebouncedPrefetchBooks(ms = 300) {
	const queryClient = useQueryClient();

	const debouncedPrefetch = useMemo(
		() =>
			debounce((libraryId: string) => {
				queryClient.prefetchQuery({
					queryKey: ["books", libraryId],
					queryFn: () => getBooksByLibraryId(libraryId),
					staleTime: 1000 * 60 * 5,
				});
				// console.log("prefetching books");
			}, ms),

		[queryClient, ms]
	);

	return debouncedPrefetch;
}
