import { useLibraryProvider } from "@/features/library/libraryProvider";
import LibraryHeaderCover from "./libraryHeaderCover";
import ShowMore from "@/shared/components/ui/showMore";
import { forwardRef, HTMLAttributes } from "react";

type LibraryheaderProps = {
	coverPath: string;
};

const LibraryHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & LibraryheaderProps>(
	({ coverPath }: LibraryheaderProps, ref) => {
		const { library } = useLibraryProvider();

		return (
			<div ref={ref} className="w-full">
				<div className="flex flex-col gap-2 h-full">
					<div className="flex flex-col md:flex-row">
						<LibraryHeaderCover coverPath={coverPath} />
						<div className="mt-6 px-4 flex flex-col">
							<div className="flex w-full">
								<h1 className="font-bold text-xl flex-grow truncate">{library?.name}</h1>
							</div>
							{library?.description ? (
								<div className="flex w-full">
									<ShowMore text={library?.description ?? ""} maxLength={112} />
								</div>
							) : null}
							<div className="mt-2 w-full"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

export default LibraryHeader;
