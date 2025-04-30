import { Library } from "../libraries/types";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useLibraryByIdQuery } from "../libraries/model/queries/useLibrariesQuery";
import { useLibraryCover } from "../libraries/hooks/useLibraryCover";

// type LibraryConfig = {
// 	layout: "list" | "compact-list" | "grid" | "compact-grid";
// };

type LibraryContextProps = {
	library: Library;
	coverPath: string | null;
	coverPathLoading: boolean;
};

const LibraryContext = createContext<LibraryContextProps | null>(null);

export type LibraryProviderProps = PropsWithChildren & {
	libraryId: string;
};

export const LibraryProvider = ({ children, libraryId }: LibraryProviderProps) => {
	const { data: library, isLoading, isError } = useLibraryByIdQuery(libraryId);
	const { coverPath, loading: coverPathLoading } = useLibraryCover(libraryId);

	// if (isLoading) return null;
	if (!library) {
		throw new Error("Library data missing in suspense context");
	}

	const value = useMemo(
		() => ({
			library: library,
			coverPath: coverPath ?? null,
			coverPathLoading,
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
