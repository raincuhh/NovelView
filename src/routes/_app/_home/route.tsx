import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_home")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col h-full">
			<Outlet />
		</div>
	);
}
