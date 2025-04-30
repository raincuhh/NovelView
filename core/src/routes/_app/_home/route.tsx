import { createFileRoute, Outlet } from "@tanstack/react-router";
import { usePrefetchQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/authStore";
import { getFirstLibrary, getMostInteractedLibraries } from "@/features/libraries/lib/selectLibraries";
import { getRecentlyOpenedBooks } from "@/features/books/lib/selectBook";
import SuspenseLoaderFallback from "@/shared/components/ui/suspenseLoaderFallback";
import { Suspense } from "react";

export const Route = createFileRoute("/_app/_home")({
	component: RouteComponent,
});

function RouteComponent() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();

	usePrefetchQuery({
		queryKey: ["library", userId],
		queryFn: () => getFirstLibrary(userId),
	});

	usePrefetchQuery({
		queryKey: ["mostRecentlyReadBooks", userId, { limit: 16 }],
		queryFn: () => getRecentlyOpenedBooks(userId, 16),
	});

	usePrefetchQuery({
		queryKey: ["mostInteractedLibraries", userId],
		queryFn: () => getMostInteractedLibraries(userId),
	});

	return (
		<Suspense fallback={<SuspenseLoaderFallback />}>
			<Outlet />
		</Suspense>
	);
}
