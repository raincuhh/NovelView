import EmptyLibraries from "@/features/libraries/components/ui/emptyLibraries";
import LibrariesNavbar from "@/pages/libraries/components/ui/librariesNavbar";
import MobileBottomPadding from "@/shared/components/ui/mobileBottomPadding";
import ScrollContainer from "@/shared/components/ui/scrollContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_libraries/libraries")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<ScrollContainer className="h-full">
			<div className="relative flex flex-col h-full pt-12">
				<LibrariesNavbar />
				<div className="flex flex-col h-full mt-2 justify-center">
					<EmptyLibraries />
					<MobileBottomPadding />
				</div>
			</div>
		</ScrollContainer>
	);
}
