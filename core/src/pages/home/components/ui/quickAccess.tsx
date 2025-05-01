import RenderList from "@/shared/components/utils/renderList";
import QuickAccessItem from "./quickAccessItem";
import { useAuthStore } from "@/features/auth/authStore";
import { cn } from "@/shared/lib/globalUtils";
import { useMostInteractedLibrariesQuery } from "@/features/libraries/model/queries/useLibrariesQuery";

export default function QuickAccess() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();
	const { data: libraries } = useMostInteractedLibrariesQuery(userId);

	if (!libraries.length) return null;

	return (
		<Wrapper>
			<Grid rows={Math.round(libraries.length / 2)}>
				<RenderList
					data={libraries}
					render={(library) => <QuickAccessItem key={`quick-access-${library.id}`} data={library} />}
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
