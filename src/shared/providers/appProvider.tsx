import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SystemProvider } from "./systemProvider";
import { PowerSyncDatabase } from "@powersync/web";

type AppProviderProps = PropsWithChildren<{}>;

const AppProvider = ({ children }: AppProviderProps) => {
	// const initAuth = useAuthStore((state) => state.initAuth);
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

	// useEffect(() => {
	// 	const cleanup = initAuth();
	// 	return cleanup;
	// }, [initAuth]);

	console.log("PowerSyncDatabase", PowerSyncDatabase);
	return (
		<QueryClientProvider client={queryClient}>
			<SystemProvider>{children}</SystemProvider>
			{/* {children} */}
		</QueryClientProvider>
	);
};

export default AppProvider;
