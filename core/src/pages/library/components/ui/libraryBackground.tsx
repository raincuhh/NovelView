import { LINEAR_GRADIENT_HEIGHT_AMOUNT_BEFORE_TRANSITION } from "../../../../features/libraries/consts";

type LibraryBackgroundProps = {
	coverPath?: string;
	libraryBackgroundUrl?: string;
};

export default function LibraryBackground({ coverPath, libraryBackgroundUrl }: LibraryBackgroundProps) {
	const backgroundImage = libraryBackgroundUrl ?? coverPath;
	const hasImage = Boolean(backgroundImage);

	return (
		<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
			{hasImage ? (
				<img
					className="w-full h-128 sm:86 object-cover blur-md opacity-30"
					src={backgroundImage}
					alt="Library background"
					style={{
						WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${LINEAR_GRADIENT_HEIGHT_AMOUNT_BEFORE_TRANSITION}, rgba(0,0,0,0) 100%)`,
						maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${LINEAR_GRADIENT_HEIGHT_AMOUNT_BEFORE_TRANSITION}, rgba(0,0,0,0) 100%)`,
						backgroundColor: "black",
					}}
				/>
			) : (
				<div
					className="w-full h-128 md:h-86 bg-accent"
					style={{
						WebkitMaskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${LINEAR_GRADIENT_HEIGHT_AMOUNT_BEFORE_TRANSITION}, rgba(0,0,0,0) 100%)`,
						maskImage: `linear-gradient(to bottom, rgba(0,0,0,1) ${LINEAR_GRADIENT_HEIGHT_AMOUNT_BEFORE_TRANSITION}, rgba(0,0,0,0) 100%)`,
					}}
				/>
			)}
		</div>
	);
}
