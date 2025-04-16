import RenderList from "@/shared/components/utils/renderList";
import QuickAccessItem from "./quickAccessItem";
import { useAuthStore } from "@/features/auth/authStore";
import { useQuery } from "@powersync/tanstack-react-query";
import Skeleton from "react-loading-skeleton";
import { getCombinedMostInteractedLibraries } from "@/features/libraries/libraryService";
import { MostInteractedLibrary } from "@/features/libraries/types";
import { cn } from "@/shared/lib/globalUtils";

export default function QuickAccess() {
	const userId = useAuthStore((state) => state.user?.auth.id);

	const {
		data: libraries,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["mostInteractedLibraries", userId],
		queryFn: () => {
			if (!userId) throw new Error("User ID is missing");
			return getCombinedMostInteractedLibraries(userId);
		},
		enabled: !!userId,
	});

	if (isLoading) {
		return (
			<Wrapper>
				<Grid>
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} height="3rem" width="100%" />
					))}
				</Grid>
			</Wrapper>
		);
	}

	if (error) {
		return (
			<Wrapper>
				<p className="text-red-500">Error: {error.message}</p>
			</Wrapper>
		);
	}

	if (!libraries || libraries.length === 0) return null;

	return (
		<Wrapper>
			<Grid rows={libraries.length}>
				<RenderList
					data={libraries}
					render={(item: MostInteractedLibrary, i: number) => (
						<QuickAccessItem key={item.id + item.cover_url + i} data={item} />
					)}
				/>
			</Grid>
		</Wrapper>
	);
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="px-4">
		<div className="flex flex-col">{children}</div>
	</div>
);

const Grid = ({ children, rows }: { children: React.ReactNode; rows?: number }) => (
	<ul className={cn("grid grid-cols-2 gap-2", rows ? `grid-rows-${rows}` : "grid-rows-3")}>{children}</ul>
);
