import { Database } from "@/shared/lib/appSchema";
import { db, supabase } from "@/shared/providers/systemProvider";
import { useEffect, useState } from "react";

export default function QuickAccess() {
	const [libraries, setLibraries] = useState<Database["libraries"][]>([]);

	useEffect(() => {
		const initWatch = async () => {
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

		initWatch();
	}, []);

	return (
		<div className="px-4">
			<div className="flex flex-col">
				<ul className="grid grid-cols-2 grid-rows-3">
					<div>1</div>
					<div>2</div>
					<div>3</div>
					<div>4</div>
					<div>5</div>
					<div>6</div>
				</ul>
			</div>
		</div>
	);
}
