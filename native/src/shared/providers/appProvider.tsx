import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SystemProvider } from "./systemProvider";
import AuthInitializer from "@/features/auth/components/utils/authInitializer";
import { SkeletonTheme } from "react-loading-skeleton";
import { cn } from "../lib/globalUtils";
import SetupAppData from "@/features/filesystem/components/utils/setupAppData";

type AppProviderProps = PropsWithChildren<{}>;

const AppProvider = ({ children }: AppProviderProps) => {
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

	return (
		<SystemProvider>
			<QueryClientProvider client={queryClient}>
				<SkeletonTheme
					baseColor={cn("var(--color-base-10)")}
					highlightColor={cn("var(--color-accent-2)")}
				>
					<AuthInitializer />
					<SetupAppData />
					{children}
				</SkeletonTheme>
			</QueryClientProvider>
		</SystemProvider>
	);
};

export default AppProvider;
