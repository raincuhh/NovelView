import { useAuthStore } from "@/features/auth/authStore";
import { useLibrariesSettingsStore } from "@/features/libraries/librariesSettingsStore";
import { useAllLibrariesQuery } from "@/features/libraries/model/queries/useLibrariesQuery";
import { cn } from "@/shared/lib/globalUtils";
import LibrariesItem from "./librariesItem";
import { sortLibraries } from "@/features/libraries/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export default function LibrariesList() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();
	const { data: libraries } = useAllLibrariesQuery(userId);
	const { settings } = useLibrariesSettingsStore();

	const parentRef = useRef<HTMLDivElement>(null);

	if (!libraries.length) return null;

	const sortedLibraries = sortLibraries(libraries, settings.sort, settings.direction);

	const columns = 3;
	const rowCount = Math.ceil(libraries.length / columns);

	const rowVirtualizer = useVirtualizer({
		count: rowCount,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 180,
		overscan: 5,
	});

	return (
		<div ref={parentRef} className={cn("w-full overflow-auto", settings.layout === "grid" ? "px-4" : "")}>
			<div
				style={{
					height: `${rowVirtualizer.getTotalSize()}px`,
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
			</div>
		</div>
	);
}
