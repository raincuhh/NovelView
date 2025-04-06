import { PowerSyncContext } from "@powersync/react";
import { PowerSyncDatabase } from "@powersync/web";
import { ReactNode, Suspense, useEffect, useState } from "react";
import BackendConnector from "../lib/backendConnector";
import { AppSchema } from "../lib/appSchema";

const powerSync = new PowerSyncDatabase({
	database: { dbFilename: "local.db" },
	schema: AppSchema,
	flags: {
		useWebWorker: false,
	},
});

const backend = new BackendConnector();

const SystemProvider = ({ children }: { children: ReactNode }) => {
	const [db] = useState<PowerSyncDatabase>(powerSync);
	const [connector] = useState<BackendConnector>(backend);

	useEffect(() => {
		powerSync.init();
		powerSync.connect(connector);
		console.log("yo");
	}, [db, connector]);

	return (
		<Suspense fallback={<>Loading...</>}>
			<PowerSyncContext.Provider value={db}>{children}</PowerSyncContext.Provider>
		</Suspense>
	);
};

export { SystemProvider };
