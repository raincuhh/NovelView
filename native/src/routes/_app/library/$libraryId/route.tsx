import { LibraryProvider } from "@/features/library/libraryProvider";
import MobilePadding from "@/shared/components/ui/mobilePadding";
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/library/$libraryId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { libraryId } = useParams({ from: "/_app/library/$libraryId" });

	return (
		<LibraryProvider libraryId={libraryId}>
			<div className="flex flex-col">
				<Outlet />
			</div>
			<MobilePadding />
		</LibraryProvider>
	);
}
