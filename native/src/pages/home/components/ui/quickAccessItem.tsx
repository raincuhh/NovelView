import { MostInteractedLibrary } from "@/features/libraries/types";
import { Cover, CoverImage } from "@/shared/components/ui/cover";
import PlaceholderLibraryCover from "@/features/libraries/components/ui/placeholderLibraryCover";
import Skeleton from "react-loading-skeleton";
import { useLibraryCover } from "@/features/libraries/hooks/useLibraryCover";

type QuickAccessItemProps = {
	data: MostInteractedLibrary;
};

export default function QuickAccessItem({ data }: QuickAccessItemProps) {
	const { coverPath, loading } = useLibraryCover(data.id);

	const Comp = "div";

	return (
		<Comp className="flex relative w-full">
			<div className="w-full h-full bg-secondary hover:bg-secondary-alt transition-discrete ease-in-out duration-100 rounded-sm">
				<div className="flex w-full h-full">
					<Cover
						className="h-12 min-w-12 max-w-12 mr-2"
						style={{ boxShadow: "5px 0px 15px rgba(0, 0, 0, 0.35)" }}
					>
						{loading ? (
							<Skeleton className="w-full h-full" />
						) : coverPath ? (
							<CoverImage src={coverPath} alt="cover" className="rounded-l-sm rounded-r-none" />
						) : (
							<PlaceholderLibraryCover />
						)}
					</Cover>
					<div className="flex w-full h-full items-center pr-2 overflow-hidden">
						<div className="select-none text-sm font-extrabold flex-grow truncate">{data.name}</div>
					</div>
				</div>
			</div>
		</Comp>
	);
}
