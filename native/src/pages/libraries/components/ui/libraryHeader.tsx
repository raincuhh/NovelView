import { useLibraryCover } from "@/features/libraries/hooks/useLibraryCover";
import { useLibraryProvider } from "@/features/libraries/libraryProvider";

export default function LibraryHeader() {
	const { library } = useLibraryProvider();
	// const { coverPath, loading } = useLibraryCover(data.id);

	return <div className="min-h-128 md:min-h-86">header</div>;
}
