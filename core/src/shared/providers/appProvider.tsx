import { PropsWithChildren, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SystemProvider } from "./systemProvider";
import AuthInitializer from "@/features/auth/components/utils/authInitializer";
import { SkeletonTheme } from "react-loading-skeleton";
import { cn } from "../lib/globalUtils";
import SetupAppdata from "@/features/fs/components/utils/setupAppdata";
import { useRouter } from "@tanstack/react-router";
import { useHistoryStore } from "../stores/historyStore";
import { useMediaQuery } from "react-responsive";
import AuthGate from "@/features/auth/components/utils/authGate";

type AppProviderProps = PropsWithChildren;

const AppProvider = ({ children }: AppProviderProps) => {
	// @ts-ignore
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const router = useRouter();
	const setRouter = useHistoryStore((s) => s.setRouter);
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
					},
				},
			})
	);

	useEffect(() => {
		setRouter(router);
	}, [router]);

	return (
		<SystemProvider>
			<QueryClientProvider client={queryClient}>
				<SkeletonTheme
					baseColor={cn("var(--color-secondary)")}
					highlightColor={cn("var(--color-secondary-alt)")}
				>
					<AuthInitializer />
					<SetupAppdata />
					<AuthGate>{children}</AuthGate>
				</SkeletonTheme>
			</QueryClientProvider>
		</SystemProvider>
	);
};

export default AppProvider;
