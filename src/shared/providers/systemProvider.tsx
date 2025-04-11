import { PowerSyncContext } from "@powersync/react";
import { PowerSyncDatabase, SyncStreamConnectionMethod } from "@powersync/web";
import { SupabaseConnector } from "../lib/supabaseConnector";
import { createContext, ReactNode, Suspense, useContext, useEffect, useState } from "react";
import { AppSchema } from "../lib/appSchema";

const SupabaseContext = createContext<SupabaseConnector | null>(null);
export const useSupabase = () => useContext(SupabaseContext);
const supabase: SupabaseConnector = new SupabaseConnector();

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
			initialized: () => {
				console.log("Connector Initialized");
			},
			sessionStarted: () => {
				powerSync
					.connect(connector, { connectionMethod: SyncStreamConnectionMethod.WEB_SOCKET })
					.then(() => console.log("Successfully connected"))
					.catch((err: any) => {
						console.error("Error connecting to PowerSync:", err);

						setTimeout(() => {
							console.log("retrying websocket connection");
							powerSync.connect(connector, {
								connectionMethod: SyncStreamConnectionMethod.WEB_SOCKET,
							});
						}, 5000);
					});
			},
		});

		connector.init();

		return () => l?.();
	}, [powerSync, connector]);

	useEffect(() => {}, []);

	return (
		<Suspense fallback={<>Loading...</>}>
			<PowerSyncContext.Provider value={powerSync}>
				<SupabaseContext.Provider value={connector}>{children}</SupabaseContext.Provider>
			</PowerSyncContext.Provider>
		</Suspense>
	);
};

export { supabase, SystemProvider, db };
