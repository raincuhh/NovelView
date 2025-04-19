import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_home/home/recents")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div className="flex flex-col"></div>;
}
