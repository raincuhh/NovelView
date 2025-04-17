import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_libraries/_library/libraries/$libraryId")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div className="flex flex-col">yokoso</div>;
}
