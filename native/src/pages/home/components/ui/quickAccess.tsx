import RenderList from "@/shared/components/utils/renderList";
import QuickAccessItem from "./quickAccessItem";
import { useAuthStore } from "@/features/auth/authStore";
import Skeleton from "react-loading-skeleton";
import { cn } from "@/shared/lib/globalUtils";
import { useEffect, useState } from "react";
import { getLibraryCoverPath } from "@/features/libraries/lib/utils";
import { MostInteractedLibrary } from "@/features/libraries/types";
import { useMostInteractedLibrariesQuery } from "@/features/libraries/model/queries/useLibrariesQuery";

export default function QuickAccess() {
	const userId = useAuthStore((s) => s.user?.auth.id);
	const { data: libraries, isLoading, error } = useMostInteractedLibrariesQuery(userId ?? "");

	const [coverPaths, setCoverPaths] = useState<Record<string, string | null>>({});
	const [loadingCovers, setLoadingCovers] = useState<boolean>(true);

	useEffect(() => {
		if (!libraries?.length) return;

		const loadCovers = async () => {
			setLoadingCovers(true);
			const entries = await Promise.all(
				libraries.map(async (lib: MostInteractedLibrary) => {
					const cover = await getLibraryCoverPath(lib?.id);
					return [lib.id, cover] as const;
				})
			);

			setCoverPaths(Object.fromEntries(entries));
			setLoadingCovers(false);
		};

		loadCovers();
	}, [libraries]);

	const isFullyLoading = isLoading || loadingCovers;
	const hasLibrares = !!libraries && libraries.length > 0;

	if (isFullyLoading) return <QuickAccessSkeleton />;
	if (error) {
		console.log(error.message);
		return (
			<Wrapper>
				<p className="text-danger text-center font-bold">Error fetching libraries.</p>
			</Wrapper>
		);
	}

	if (!hasLibrares) return null;

	return (
		<Wrapper>
			<Grid rows={Math.round(libraries.length / 2)}>
				<RenderList
					data={libraries}
					render={(library) => {
						const coverPath = coverPaths[library.id] || "";
						return <QuickAccessItem key={library.id} data={library} coverPath={coverPath} />;
					}}
				/>
			</Grid>
		</Wrapper>
	);
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col">
		<div className="px-4 flex flex-col">{children}</div>
	</div>
);

const Grid = ({ children, rows }: { children: React.ReactNode; rows?: number }) => (
	<ul className={cn("grid grid-cols-2 gap-2", rows ? `grid-rows-${rows}` : "grid-rows-3")}>{children}</ul>
);

const QuickAccessSkeleton = () => (
	<Wrapper>
		<Grid>
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="relative w-full h-12">
					<Skeleton className="h-full w-full" />

					<div className="absolute top-1/2 left-0 w-full px-4 translate-y-[-50%]">
						<div className="">
							<Skeleton className="w-6 h-6" />
						</div>
					</div>
				</div>
			))}
		</Grid>
	</Wrapper>
);
