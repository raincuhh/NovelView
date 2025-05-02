import { useAuthStore } from "@/features/auth/authStore";
import { useLibrariesSettingsStore } from "@/features/libraries/librariesSettingsStore";
import { useAllLibrariesQuery } from "@/features/libraries/model/queries/useLibrariesQuery";
import { cn } from "@/shared/lib/globalUtils";
import LibrariesItem from "./librariesItem";
import { sortLibraries } from "@/features/libraries/lib/utils";
import RenderList from "@/shared/components/utils/renderList";
import { Library, LibraryWithBookCount } from "@/features/libraries/types";
import {
	useBookCountByLibraryIdQuery,
	useBookCountsForLibrariesQuery,
} from "@/features/books/model/queries/useBookQuery";
// import { useVirtualizer } from "@tanstack/react-virtual";
// import { OverlayScrollbarsComponentRef } from "overlayscrollbars-react";

// type LibrariesListProps = {
// 	parentRef: OverlayScrollbarsComponentRef;
// };

export default function LibrariesList() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();
	const { data: libraries } = useAllLibrariesQuery(userId);
	const { settings } = useLibrariesSettingsStore();

	const { data: counts } = useBookCountsForLibrariesQuery(userId);

	const librariesWithCounts = libraries.map((lib) => ({
		...lib,
		bookCount: counts.find((c) => c.libraryId === lib.id)?.count ?? 0,
	}));

	const sortedLibraries = sortLibraries(librariesWithCounts, settings.sort, settings.direction);

	if (!libraries.length) return null;

	return (
		<>
			<div
				className={cn(
					"w-full flex",
					settings.layout === "grid" ? "px-4" : "",
					settings.layout === "gridCompact" ? "px-4" : ""
				)}
			>
				<ul
					className={cn(
						"w-full",
						settings.layout === "grid"
							? "grid grid-cols-3 sm:flex sm:flex-wrap gap-2 "
							: "flex flex-col h-full",
						settings.layout === "gridCompact" ? "grid grid-cols-3 gap-3" : ""
					)}
				>
					<RenderList
						data={sortedLibraries}
						render={(library: Library) => (
							<LibrariesItem key={`library-${library.id}`} data={library} layout={settings.layout} />
						)}
					/>
				</ul>
				{/* <div
					style={{
						height: `400px`,
						position: "relative",
						width: "100%",
					}}
				>
					{rowVirtualizer.getVirtualItems().map((virtualRow) => {
						const start = virtualRow.index * columns;
						const items = sortedLibraries.slice(start, start + columns);

						return (
							<div
								key={virtualRow.key}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									transform: `translateY(${virtualRow.start}px)`,
								}}
							>
								<ul
									className={cn(
										settings.layout === "grid" ? "grid grid-cols-3 gap-4" : "flex flex-col"
									)}
								>
									{items.map((library) => (
										<LibrariesItem
											key={`library-${library.id}`}
											data={library}
											layout={settings.layout}
										/>
									))}
								</ul>
							</div>
						);
					})}
				</div> */}
			</div>
		</>
	);
}
