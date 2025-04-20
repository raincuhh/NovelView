import MobilePadding from "@/shared/components/ui/mobileBottomPadding";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_libraries")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="">
			<Outlet />
			<MobilePadding />
		</div>
	);
}
