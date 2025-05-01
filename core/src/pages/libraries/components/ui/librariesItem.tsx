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

export default function LibraryItem({ data, layout }: LibraryItemProps) {
	const { data: coverPath } = useLibraryCoverPath(data.id);
	const { data: count } = useBookCountByLibraryIdQuery(data.id);
	const hasImage = Boolean(coverPath);

	return (
		<li>
			<LibraryLink
				libraryId={data.id}
				className={cn("", layout === "grid" ? "aspect-[3/2]" : "flex items-center gap-3")}
			>
				<div className="flex flex-col gap-2">
					<Cover className={cn("", layout === "grid" ? "h-24 w-full" : "")}>
						{hasImage ? (
							<CoverImage src={coverPath!} alt="cover" className="" />
						) : (
							<PlaceholderLibraryCover className="" />
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
