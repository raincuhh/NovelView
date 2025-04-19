import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_home/home/analytics")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_app/_home/home/analytics"!</div>;
}
