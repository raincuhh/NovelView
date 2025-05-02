import { useBookCountByLibraryIdQuery } from "@/features/books/model/queries/useBookQuery";
import { LibraryLink } from "@/features/libraries/components/ui/libraryLink";
import PlaceholderLibraryCover from "@/features/libraries/components/ui/placeholderLibraryCover";
import { useLibraryCoverPath } from "@/features/libraries/model/queries/useLibrariesQuery";
import { LibrariesLayoutOption, Library } from "@/features/libraries/types";
import { Cover, CoverImage } from "@/shared/components/ui/cover";
import { cn } from "@/shared/lib/globalUtils";

type LibraryItemProps = {
	data: Library;
	layout: LibrariesLayoutOption;
};

export default function LibrariesItem({ data, layout }: LibraryItemProps) {
	const { data: coverPath } = useLibraryCoverPath(data.id);
	const { data: count } = useBookCountByLibraryIdQuery(data.id);
	const hasImage = Boolean(coverPath);

	return (
		<li className="pb-2">
			<LibraryLink
				libraryId={data.id}
				className={cn("h-full w-full", layout === "grid" ? "aspect-[3/2]" : "flex items-center gap-3")}
			>
				<div className={cn("w-full flex gap-2", layout === "grid" ? "flex-col" : "flex-row")}>
					<Cover className={cn("", layout === "grid" ? " w-full h-24" : " w-full")}>
						{hasImage ? (
							<CoverImage src={coverPath!} alt="cover" className="w-full h-full" />
						) : (
							<PlaceholderLibraryCover className="h-full w-full" />
						)}
					</Cover>
					<div className="flex flex-col w-full overflow-hidden">
						<h1 className="select-none text-sm font-bold w-full flex-grow truncate">{data.name}</h1>
						<p className="text-xs text-muted font-semibold">{count}</p>
					</div>
				</div>
			</LibraryLink>
		</li>
	);
}
