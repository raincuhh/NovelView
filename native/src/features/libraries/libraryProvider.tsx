import { Library } from "@/shared/lib/appSchema";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { getLibraryById } from "./lib/selectLibrary";
import { useQuery } from "@tanstack/react-query";

type LibraryContextProps = {
	library: Library | null;
	isLoading: boolean;
	isError: boolean;
};

const LibraryContext = createContext<LibraryContextProps | null>(null);

export type LibraryProviderProps = PropsWithChildren & {
	libraryId: string;
};

export const LibraryProvider = ({ children, libraryId }: LibraryProviderProps) => {
	const {
		data: library,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["library", libraryId],
		queryFn: () => getLibraryById(libraryId),
		staleTime: 1000 * 60 * 5,
		// cacheTime: 1000 * 60 * 10,
		enabled: !!libraryId,
	});

	const value = useMemo(
		() => ({
			library: library ?? null,
			isLoading,
			isError,
		}),
		[library, isLoading, isError]
	);
	return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibraryProvider = (): LibraryContextProps => {
	const context = useContext(LibraryContext);
	if (!context) throw new Error("useLibraryProvider must be used within a LibraryProvider");
	return context;
};
