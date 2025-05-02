import { useBookCountByLibraryIdQuery } from "@/features/books/model/queries/useBookQuery";
import { LibraryLink } from "@/features/libraries/components/ui/libraryLink";
import PlaceholderLibraryCover from "@/features/libraries/components/ui/placeholderLibraryCover";
import { useLibraryCoverPath } from "@/features/libraries/model/queries/useLibrariesQuery";
import { LibrariesLayoutOption, Library } from "@/features/libraries/types";
import { Cover, CoverImage } from "@/shared/components/ui/cover";
import Icon from "@/shared/components/ui/icon";
import { cn } from "@/shared/lib/globalUtils";
import { useEffect } from "react";

type LibraryItemProps = {
	data: Library;
	layout: LibrariesLayoutOption;
};

export default function LibrariesItem({ data, layout }: LibraryItemProps) {
	const { data: coverPath } = useLibraryCoverPath(data.id);
	const { data: count } = useBookCountByLibraryIdQuery(data.id);
	const hasImage = Boolean(coverPath);

	useEffect(() => {
		console.log(layout);
	}, [layout]);

	return (
		<li>
			<LibraryLink libraryId={data.id} className={cn("h-full w-full", layout === "grid" ? "" : "")}>
				<div className={cn("flex", layout === "grid" ? "flex-col" : "flex-row")}>
					<div
						className={cn(
							" w-full",
							layout === "grid" ? "flex flex-col" : "",
							layout === "list" ? "flex flex-row" : "",
							layout === "gridCompact" ? "" : "",
							layout === "listCompact" ? "" : ""
						)}
					>
						<div className="overflow-hidden w-full h-26 rounded-sm object-cover relative">
							{hasImage ? (
								<img src={coverPath!} alt="cover" className="w-full h-full" />
							) : (
								<div className="w-full h-full rounded-sm bg-secondary-alt flex justify-center items-center">
									<Icon.book className="fill-faint w-[50%] h-[50%]" />
								</div>
							)}
						</div>
						<div
							className={cn(
								"",
								layout === "grid" ? "flex flex-col" : "flex flex-row",
								layout === "gridCompact" ? "flex flex-col" : "flex flex-row"
							)}
						>
							{!(layout === "gridCompact") ? <div className={cn("flex")}>{data.name}</div> : null}
						</div>
					</div>

					{/* <Cover className={cn("", layout === "grid" ? " w-full" : " w-full")}>
						{hasImage ? (
							<CoverImage src={coverPath!} alt="cover" className="w-12 h-12" />
						) : (
							<PlaceholderLibraryCover className="h-12 w-12" />
						)}
					</Cover>
					<div className="flex flex-col w-full overflow-hidden">
						<h1 className="select-none text-sm font-bold w-full flex-grow truncate">{data.name}</h1>
						<p className="text-xs text-muted font-semibold">{count}</p>
					</div> */}
				</div>
			</LibraryLink>
		</li>
	);
}
