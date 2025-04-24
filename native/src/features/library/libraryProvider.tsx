import { Library } from "../libraries/types";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { useLibraryByIdQuery } from "../libraries/model/queries/useLibrariesQuery";
import { useLibraryCover } from "../libraries/hooks/useLibraryCover";

// type LibraryConfig = {
// 	layout: "list" | "compact-list" | "grid" | "compact-grid";
// };

type LibraryContextProps = {
	library: Library | null;
	isLoading: boolean;
	isError: boolean;
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

	const value = useMemo(
		() => ({
			library: library ?? null,
			isLoading,
			isError,
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
