import { PropsWithChildren } from "react";
import { useAuthStore } from "../../authStore";
import SuspenseLoaderFallback from "@/shared/components/ui/suspenseLoaderFallback";

export default function AuthGate({ children }: PropsWithChildren) {
	const loading = useAuthStore((s) => s.loading);
	const getUserId = useAuthStore((s) => s.getUserId);

	if (loading) {
		return <SuspenseLoaderFallback />;
	}

	try {
		const userId = getUserId();
		if (!userId) throw new Error("No userId returned");
	} catch (err) {
		return <SuspenseLoaderFallback />;
	}

	return <>{children}</>;
}
