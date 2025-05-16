import { useBookCountByLibraryIdQuery } from "@/features/books/model/queries/useBookQuery";
import { LibraryLink } from "@/features/libraries/components/ui/libraryLink";
import { useLibraryCoverPath } from "@/features/libraries/model/queries/useLibrariesQuery";
import { LibrariesLayoutOption, Library } from "@/features/libraries/types";
import SyncIcon from "@/features/library/components/ui/syncIcon";
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
		// console.log(layout);
	}, [layout]);

	const isGrid = layout === "grid";
	const isCompact = layout === "gridCompact" || layout === "listCompact";
	const isList = layout === "list";

	return (
		<li className={cn(isList ? "px-4 mb-3" : "")}>
			<LibraryLink libraryId={data.id} className={cn("h-full w-full")}>
				<div className={cn("flex", layout === "grid" ? "flex-col" : "flex-row")}>
					<div
						className={cn(
							"w-full gap-2",
							isGrid ? "flex flex-col" : "",
							isList ? "flex flex-row" : "",
							layout === "gridCompact" ? "" : "",
							layout === "listCompact" ? "flex flex-row" : ""
						)}
					>
						<div
							className={cn(
								"relative w-full overflow-hidden rounded-sm border border-border hover:border-border-hover transition-all duration-100 ease-in-out",
								"sm:min-w-42 sm:min-h-42",
								// isCompact ? "max-w-[96px] max-h-[96px]" : "",
								// isList ? "max-w-20 min-w-20 md:min-w-[80px] md:min-h-[80px]" : "",
								isList ? "max-w-20 min-w-20" : ""
							)}
							style={{ aspectRatio: "1 / 1" }}
						>
							{hasImage ? (
								<Cover className="absolute inset-0 w-full h-full">
									<CoverImage src={coverPath!} alt="cover" className="object-cover w-full h-full" />
								</Cover>
							) : (
								<div className="absolute inset-0 w-full h-full rounded-sm bg-secondary-alt flex justify-center items-center">
									<Icon.book className="fill-faint w-[50%] h-[50%]" />
								</div>
							)}
						</div>
						{/* <div
							className={cn(
								"overflow-hidden h-30 w-full rounded-sm object-cover relative border-border border hover:border-border-hover transition-discrete duration-100 ease-in-out",
								isList ? "max-h-20 min-h-20 h-full max-w-20 min-w-20 w-full" : ""
							)}
						>
							{hasImage ? (
								<Cover className="h-full w-full">
									<CoverImage src={coverPath!} alt="cover" />
								</Cover>
							) : (
								<div className="w-full h-full rounded-sm bg-secondary-alt flex justify-center items-center">
									<Icon.book className="fill-faint w-[50%] h-[50%]" />
								</div>
							)}
						</div> */}
						<div className={cn("w-full", isGrid ? "" : "")}>
							{!(layout === "gridCompact") ? (
								<div className="flex flex-col pb-4 h-full justify-center">
									<div
										className={cn(
											"font-semibold w-full overflow-hidden",
											isList ? "text-md" : "",
											!isList ? "text-sm" : ""
										)}
									>
										<div className="select-none w-full flex-grow truncate">{data.name}</div>
									</div>
									<div className="flex gap-1 items-center">
										{data.type === "synced" ? (
											<>
												<div>
													<SyncIcon type={data.type} />
												</div>
												<div className="w-[3px] h-[3px] rounded-full bg-muted"></div>
											</>
										) : null}
										<div className="text-xs text-muted">{count}</div>
									</div>
								</div>
							) : null}
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
