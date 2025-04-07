import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/shared/providers/systemProvider";

export const Route = createFileRoute("/(onboarding)/_onboarding")({
	component: RouteComponent,
	beforeLoad: async ({ location }) => {
		const session = await supabase.getSession();
		if (session) {
			throw redirect({
				to: "/test",
				search: {
					redirect: location.href,
				},
			});
		}
	},
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
