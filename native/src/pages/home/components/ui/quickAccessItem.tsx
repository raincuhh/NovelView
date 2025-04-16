import { getLibraryCoverPath } from "@/features/libraries/libraryService";
import { MostInteractedLibrary } from "@/features/libraries/types";
import { Cover, CoverImage } from "@/shared/components/ui/cover";
import { useEffect, useState } from "react";
import { PLACEHOLDER_LIBRARIES_URL } from "@/shared/lib/consts";

type QuickAccessItemProps = {
	data: MostInteractedLibrary;
};

export default function QuickAccessItem({ data }: QuickAccessItemProps) {
	const [coverPath, setCoverPath] = useState<string | null>(null);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | null = null;

		const fetchCoverPath = async () => {
			const path = await getLibraryCoverPath(data.id);
			setCoverPath(path);

			if (!path) {
				timeout = setTimeout(async () => {
					const retryPath = await getLibraryCoverPath(data.id);
					if (retryPath) setCoverPath(retryPath);
				}, 250);
			}
		};

		fetchCoverPath();

		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [data.id, data.cover_url]);

	const Comp = "div";

	return (
		<Comp className="flex relative w-full">
			<div className="w-full h-full bg-secondary hover:bg-secondary-alt transition-discrete ease-in-out duration-100 rounded-sm">
				<div className="flex w-full h-full">
					<Cover
						className="h-12 min-w-12 max-w-12 mr-2"
						style={{ boxShadow: "5px 0px 15px rgba(0, 0, 0, 0.35)" }}
					>
						<CoverImage
							src={coverPath ?? PLACEHOLDER_LIBRARIES_URL}
							alt="cover"
							className="rounded-l-sm rounded-r-none"
						/>
					</Cover>
					<div className="flex w-full h-full items-center pr-2 overflow-hidden">
						<div className="select-none text-sm font-extrabold flex-grow truncate">{data.name}</div>
					</div>
				</div>
			</div>
		</Comp>
	);
}
