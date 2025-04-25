import { FileRouteTypes } from "@/routeTree.gen";
import Icon from "@/shared/components/ui/icon";
import { Link } from "@tanstack/react-router";

type HomeSectionHeaderProps = {
	label: string;
	SeeMoreto?: FileRouteTypes["to"];
};

export default function HomeSectionHeader({ label, SeeMoreto }: HomeSectionHeaderProps) {
	return (
		<div className="flex justify-between px-4 w-full items-end mb-2 select-none">
			<h1 className="text-2xl font-semibold">{label}</h1>
			{SeeMoreto ? (
				<div className="font-semibold">
					<Link
						to={SeeMoreto}
						className="text-sm text-muted hover:underline underline-offset-2 flex items-center"
					>
						See More <Icon.chevronRight className="fill-muted h-5 w-5" />
					</Link>
				</div>
			) : null}
		</div>
	);
}
