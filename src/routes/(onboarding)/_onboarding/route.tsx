import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(onboarding)/_onboarding")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-screen">
			<div className="flex min-h-full flex-col justify-center">
				<div className="flex min-h-full flex-col justify-center">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
