import { MostInteractedLibrary } from "@/features/libraries/types";
import { Cover, CoverImage } from "@/shared/components/ui/cover";
import PlaceholderLibraryCover from "@/features/libraries/components/ui/placeholderLibraryCover";
import { LibraryLink } from "@/features/libraries/components/ui/libraryLink";
import { useLibraryCoverPath } from "@/features/libraries/model/queries/useLibrariesQuery";
import SyncIcon from "@/features/library/components/ui/syncIcon";

type QuickAccessItemProps = {
	data: MostInteractedLibrary;
};

export default function QuickAccessItem({ data }: QuickAccessItemProps) {
	const { data: coverPath } = useLibraryCoverPath(data.id);
	const hasImage = Boolean(coverPath);

	return (
		<li>
			<LibraryLink libraryId={data.id} className="flex relative w-full h-full group">
				<div className="w-full h-full bg-secondary group-hover:bg-secondary-alt transition-discrete ease-in-out duration-100 rounded-sm">
					<div className="flex w-full h-full">
						<Cover
							className="h-12 min-w-12 max-w-12 mr-2"
							style={{ boxShadow: "5px 0px 15px rgba(0, 0, 0, 0.35)" }}
						>
							{hasImage ? (
								<CoverImage src={coverPath!} alt="cover" className="rounded-l-sm rounded-r-none" />
							) : (
								<PlaceholderLibraryCover className="rounded-l-sm" />
							)}
						</Cover>
						<div className="flex w-full h-full items-center pr-2 overflow-hidden justify-between">
							<h1 className="select-none text-sm font-bold w-full flex-grow truncate">{data.name}</h1>
							<div>
								<SyncIcon type={data.type} />
							</div>
						</div>
					</div>
				</div>
			</LibraryLink>
		</li>
	);
}
