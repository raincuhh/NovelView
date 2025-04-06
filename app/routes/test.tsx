import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			Hello "/test"! <Link to="/">to home</Link>
		</div>
	);
}
