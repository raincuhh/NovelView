import { Library } from "../libraries/types";
import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { getLibraryById } from "../libraries/lib/selectLibraries";
import { useQuery } from "@tanstack/react-query";

type LibraryConfig = {
	layout: "list" | "compact-list" | "grid" | "compact-grid";
};

type LibraryContextProps = {
	library: Library | null;
	isLoading: boolean;
	isError: boolean;
	config: LibraryConfig;
	setConfig: (config: LibraryConfig) => void;
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

	const [config, setConfig] = useState<LibraryConfig>({
		layout: "list",
	});

	const value = useMemo(
		() => ({
			library: library ?? null,
			isLoading,
			isError,
			config,
			setConfig,
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
