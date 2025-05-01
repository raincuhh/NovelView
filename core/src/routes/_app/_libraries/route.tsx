import { createFileRoute, Outlet } from "@tanstack/react-router";
import { usePrefetchQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/authStore";
import { getFirstLibrary, getAllLibraries } from "@/features/libraries/lib/selectLibraries";
import SuspenseLoaderFallback from "@/shared/components/ui/suspenseLoaderFallback";
import { Suspense } from "react";

export const Route = createFileRoute("/_app/_libraries")({
	component: RouteComponent,
});

function RouteComponent() {
	const { getUserId } = useAuthStore();
	const userId = getUserId();

	usePrefetchQuery({
		queryKey: ["haslibraries", userId],
		queryFn: () => getFirstLibrary(userId),
	});

	usePrefetchQuery({
		queryKey: ["libraries", userId],
		queryFn: () => getAllLibraries(userId),
	});

	return (
		<Suspense fallback={<SuspenseLoaderFallback />}>
			<Outlet />
		</Suspense>
	);
}
