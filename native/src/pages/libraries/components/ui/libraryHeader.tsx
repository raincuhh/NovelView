import LibraryHeaderCover from "./libraryHeaderCover";

type LibraryheaderProps = {
	coverPath: string;
};

export default function LibraryHeader({ coverPath }: LibraryheaderProps) {
	return (
		<div className="min-h-128 md:min-h-86 w-full">
			<div className="flex flex-col gap-2 h-full">
				<div>search</div>
				<div className="flex flex-col md:flex-row">
					<LibraryHeaderCover coverPath={coverPath} />
					<div></div>
				</div>
			</div>
		</div>
	);
}
