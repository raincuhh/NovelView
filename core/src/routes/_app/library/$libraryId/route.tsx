import { LibraryProvider } from "@/features/library/libraryProvider";
import SuspenseLoaderFallback from "@/shared/components/ui/suspenseLoaderFallback";
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_app/library/$libraryId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { libraryId } = useParams({ from: "/_app/library/$libraryId" });

	return (
		<Suspense fallback={<SuspenseLoaderFallback />}>
			<LibraryProvider libraryId={libraryId}>
				<Outlet />
			</LibraryProvider>
		</Suspense>
	);
}
