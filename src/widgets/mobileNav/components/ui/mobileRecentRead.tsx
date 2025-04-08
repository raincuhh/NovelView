import { Cover, CoverImage, CoverImageFallback } from "@/shared/components/ui/CoverImage";

export default function MobileNavigationRecentRead() {
	return (
		<div className="flex w-full px-2 py-2">
			<div className="bg-accent w-full rounded-md p-2">
				<div className="flex w-full h-full items-center gap-4">
					<div className="flex gap-2 h-full w-full items-center">
						<Cover className="h-12 w-12 rounded-sm">
							<CoverImage
								src="../../../../../public/assets/images/placeholder/shadowSlavePlaceholder.jpg"
								alt="cat"
							/>
							<CoverImageFallback isLoading={false}></CoverImageFallback>
						</Cover>
						<div className="flex flex-col max-w-[55%]">
							<h1 className="text-md truncate overflow-hidden text-ellipsis">Shadow Slave</h1>
							<span className="text-xs text-muted">1454 · An Oath and a Promise</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
