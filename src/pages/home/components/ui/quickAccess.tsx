import RenderList from "@/shared/components/utils/renderList";
import { Database } from "@/shared/lib/appSchema";
import { db, supabase } from "@/shared/providers/systemProvider";
import { useEffect, useState } from "react";
import QuickAccessItem from "./quickAccessItem";

export default function QuickAccess() {
	const [libraries, setLibraries] = useState<Database["libraries"][]>([]);

	useEffect(() => {
		const fetchUserMostInteractedWithLibraries = async () => {
			const session = await supabase.getSession();
			if (!session) return;

			const userId = session.user.id;

			return db.watch(
				`SELECT l.id, l.name, l.cover_url,
				(SELECT COUNT(*) FROM books b WHERE b.library_id = l.id) as total_reads
				FROM libraries l
				WHERE l.user_id = ?
				GROUP BY l.id
				ORDER BY total_reads DESC
				LIMIT 6`,
				[userId],
				{
					onResult: (result) => {
						setLibraries(result.rows?._array ?? []);
						// console.log(result);
					},
				}
			);
		};

		fetchUserMostInteractedWithLibraries();
	}, []);

	return (
		<div className="px-4">
			<div className="flex flex-col">
				<ul className="grid grid-cols-2 grid-rows-3">
					<RenderList data={libraries} render={(item, i: number) => <QuickAccessItem key={i} />} />
				</ul>
			</div>
		</div>
	);
}
