import { FileRouteTypes } from "@/routeTree.gen";
import { Cover, CoverImage } from "@/shared/components/ui/cover";
import { ElementType, forwardRef, HTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { PLACEHOLDER_RECENTLY_READ_URL } from "@/shared/lib/consts";

type MobileNavigationRecentReadProps = {
	coverUrl?: string;
	title?: string;
	sectionPrefix?: string | number;
	sectionSuffix?: string | number;
	to?: FileRouteTypes["to"] | string;
};

const MobileNavigationRecentRead = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & MobileNavigationRecentReadProps
>(({ className, coverUrl, title, sectionPrefix, sectionSuffix, to, ...props }, ref) => {
	const placeholderConfig: Omit<MobileNavigationRecentReadProps, "to"> = {
		coverUrl: PLACEHOLDER_RECENTLY_READ_URL,
		title: "Shadow Slave",
		sectionPrefix: "1454",
		sectionSuffix: "An Oath and a Promise",
	};

	const Comp: ElementType = to ? Link : "div";

	return (
		<Comp {...(to ? { to } : {})} className="relative flex w-full h-17" ref={ref} {...props}>
			<div className="absolute bottom-0 left-0 right-0 z-0 flex flex-col items-center justify-center mx-3">
				<div className="relative flex w-full h-full items-center gap-4 px-2 py-2 border border-border hover:border-border-hover rounded-md select-none bg-primary">
					<div className="absolute inset-0 z-0 overflow-hidden">
						<img
							className="w-full h-full object-cover blur-md opacity-30"
							src={coverUrl ?? String(placeholderConfig.coverUrl)}
							alt="bg blur cover"
						/>
					</div>
					<div className="flex gap-2 h-full w-full items-center">
						<Cover className="h-12 w-12 rounded-sm">
							<CoverImage src={coverUrl ?? String(placeholderConfig.coverUrl)} alt="cover" />
						</Cover>
						<div className="flex flex-col max-w-[60%] h-full">
							<h1 className="text-md truncate overflow-hidden text-ellipsis">
								{title ?? placeholderConfig.title}
							</h1>
							<span className="text-xs text-muted truncate overflow-hidden text-ellipsis">
								{String(sectionPrefix ?? placeholderConfig.sectionPrefix)}{" "}
								{"· ".concat(String(sectionSuffix ?? placeholderConfig.sectionSuffix))}
							</span>
						</div>
						<div></div>
					</div>
				</div>
			</div>
		</Comp>
	);
});

MobileNavigationRecentRead.displayName = "MobileNavigationRecentRead";
export default MobileNavigationRecentRead;
