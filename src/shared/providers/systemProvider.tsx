import { PowerSyncContext } from "@powersync/react";
import { PowerSyncDatabase, SyncStreamConnectionMethod } from "@powersync/web";
import { SupabaseConnector } from "../lib/supabaseConnector";
import { createContext, ReactNode, Suspense, useContext, useEffect, useState } from "react";
import { AppSchema } from "../lib/appSchema";

const SupabaseContext = createContext<SupabaseConnector | null>(null);
export const useSupabase = () => useContext(SupabaseContext);
const supabase = new SupabaseConnector();

const db = new PowerSyncDatabase({
	database: { dbFilename: "local.db" },
	schema: AppSchema,
	flags: {
		useWebWorker: false,
	},
});

const SystemProvider = ({ children }: { children: ReactNode }) => {
	const [connector] = useState<SupabaseConnector>(supabase);
	const [powerSync] = useState<PowerSyncDatabase>(db);

	useEffect(() => {
		(window as any)._powersync = powerSync;

		powerSync.init();

		const l = connector.registerListener({
			initialized: () => {},
			sessionStarted: () => {
				powerSync.connect(connector, { connectionMethod: SyncStreamConnectionMethod.WEB_SOCKET });
			},
		});

		connector.init();

		return () => l?.();
	}, [powerSync, connector]);

	return (
		<Suspense fallback={<>Loading...</>}>
			<PowerSyncContext.Provider value={powerSync}>
				<SupabaseContext.Provider value={connector}>{children}</SupabaseContext.Provider>
			</PowerSyncContext.Provider>
		</Suspense>
	);
};

export { SystemProvider };
