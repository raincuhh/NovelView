import { useAuthStore } from "@/features/auth/authStore";
import { useLibrariesSettingsStore } from "@/features/libraries/librariesSettingsStore";
import { useAllLibrariesQuery } from "@/features/libraries/model/queries/useLibrariesQuery";
import RenderList from "@/shared/components/utils/renderList";
import { cn } from "@/shared/lib/globalUtils";
import LibraryItem from "./librariesItem";
import { sortLibraries } from "@/features/libraries/lib/utils";

export default function LibrariesList() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();
	const { data: libraries } = useAllLibrariesQuery(userId);
	const { settings } = useLibrariesSettingsStore();

	if (!libraries.length) return null;

	const sortedLibraries = sortLibraries(libraries, settings.sort, settings.direction);

	return (
		<div className={cn("w-full", settings.layout === "grid" ? "px-4" : "")}>
			<ul
				className={cn(
					settings.layout === "grid"
						? "grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap gap-4"
						: "flex flex-col"
				)}
			>
				<RenderList
					data={sortedLibraries}
					render={(library) => (
						<LibraryItem key={`library-${library.id}`} data={library} layout={settings.layout} />
					)}
				/>
			</ul>
		</div>
	);
}
