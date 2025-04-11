import RenderList from "@/shared/components/utils/renderList";
// import {  Libraries as LibrariesTable } from "@/shared/lib/appSchema";
import QuickAccessItem from "./quickAccessItem";
import { useAuthStore } from "@/features/auth/authStore";
import { useQuery } from "@powersync/tanstack-react-query";
import { Libraries } from "@/shared/lib/appSchema";
import Skeleton from "react-loading-skeleton";

export default function QuickAccess() {
	const userId = useAuthStore((state) => state.user?.auth.id);

	const {
		data: libraries,
		isLoading,
		isFetching,
		error,
	} = useQuery<Libraries>({
		queryKey: ["mostInteractedLibraries"],
		query: `SELECT l.id, l.name, l.cover_url,
			(SELECT COUNT(*) FROM books b WHERE b.library_id = l.id) as total_reads
			FROM libraries l
			WHERE l.user_id = ?
			GROUP BY l.id
			ORDER BY total_reads DESC
			LIMIT 6`,
		parameters: [userId],
	});

	if (isLoading) {
		return (
			<div className="px-4">
				<div className="flex flex-col">
					<div className="grid grid-cols-2 grid-rows-3 gap-2">
						{[...Array(5)].map((_, i) => (
							<Skeleton key={i} height="3rem" width="100%" />
						))}
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return <>error... {error.message}</>;
	}

	return (
		<div className="px-4">
			<div className="flex flex-col">
				{libraries && libraries.length > 0 ? (
					<ul className="grid grid-cols-2 grid-rows-3 gap-2">
						<RenderList
							data={libraries}
							render={(item: Libraries, i: number) => <QuickAccessItem key={i} data={item} />}
						/>
					</ul>
				) : libraries ? (
					<>
						<Skeleton height="3rem" width="100%" />
					</>
				) : null}
			</div>
		</div>
	);
}
