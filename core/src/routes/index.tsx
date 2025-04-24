import { preventAuth } from "@/features/auth/lib/authGuard";
import deleteAppdata from "@/features/fs/lib/deleteAppdata";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	beforeLoad: preventAuth,
});

function RouteComponent() {
	return (
		<div className="flex flex-col">
			<div onClick={() => deleteAppdata()}>delete all appdata (testing)</div>
			<div>Hello "/"!</div>
			<Link to="/test">to test</Link>
			<Link to="/onboarding">to onboarding</Link>
		</div>
	);
}
