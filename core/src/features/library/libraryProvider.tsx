import { Library } from "../libraries/types";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useLibraryByIdQuery, useLibraryCoverPath } from "../libraries/model/queries/useLibrariesQuery";

type LibraryContextProps = {
	library: Library;
	coverPath: string | null;
};

const LibraryContext = createContext<LibraryContextProps | null>(null);

export type LibraryProviderProps = PropsWithChildren & {
	libraryId: string;
};

export const LibraryProvider = ({ children, libraryId }: LibraryProviderProps) => {
	const { data: library, isLoading, isError } = useLibraryByIdQuery(libraryId);

	if (!library) throw new Error("Library data missing in suspense context");

	const { data: coverPath } = useLibraryCoverPath(library.id);

	const value = useMemo(
		() => ({
			library: library,
			coverPath: coverPath ?? null,
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
