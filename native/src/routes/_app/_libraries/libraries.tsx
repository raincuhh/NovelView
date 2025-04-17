import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import LibrariesNavbar from "@/pages/libraries/components/ui/librariesNavbar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_libraries/libraries")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col h-full">
			<div className="flex flex-col relative h-full pt-12">
				<LibrariesNavbar />
				<div className="flex flex-col mt-2 h-full justify-center pb-48">
					<EmptyLibraries />
				</div>
			</div>
		</div>
	);
}
