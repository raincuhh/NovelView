import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SystemProvider } from "./systemProvider";
import AuthInitializer from "@/features/auth/components/utils/authInitializer";

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
		<QueryClientProvider client={queryClient}>
			<SystemProvider>
				<AuthInitializer />
				{children}
			</SystemProvider>
		</QueryClientProvider>
	);
};

export default AppProvider;
