import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SystemProvider } from "./systemProvider";
import AuthInitializer from "@/features/auth/components/utils/authInitializer";
import { SkeletonTheme } from "react-loading-skeleton";

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
				<SkeletonTheme baseColor="var(--color-base-10)" highlightColor="var(--color-base-20)">
					<AuthInitializer />
					{children}
				</SkeletonTheme>
			</QueryClientProvider>
		</SystemProvider>
	);
};

export default AppProvider;
