import { Cover, CoverImage } from "@/shared/components/ui/cover";
import Icon from "@/shared/components/ui/icon";

type LibraryHeaderCoverProps = {
	coverPath: string;
};

export default function LibraryHeaderCover({ coverPath }: LibraryHeaderCoverProps) {
	const hasImage = Boolean(coverPath);

	return (
		<header className="w-full h-min flex justify-center items-center min-h-32 select-none">
			<Cover
				className="h-56 w-56"
				style={{
					boxShadow: "rgba(0, 0, 0, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
				}}
			>
				{hasImage ? (
					<CoverImage src={coverPath} alt="library cover" className="rounded-md" />
				) : (
					<div className="w-full h-full bg-secondary-alt rounded-md flex justify-center items-center-safe">
						<Icon.book className="w-32 h-32 fill-faint" />
					</div>
				)}
			</Cover>
		</header>
	);
}
