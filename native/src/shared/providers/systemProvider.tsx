import { PowerSyncContext } from "@powersync/react";
import { PowerSyncDatabase, SyncStreamConnectionMethod } from "@powersync/web";
import { SupabaseConnector } from "../lib/supabase/supabaseConnector";
import { createContext, ReactNode, Suspense, useContext, useEffect, useState } from "react";
import { AppSchema } from "../lib/powersync/appSchema";
import Database from "@tauri-apps/plugin-sql";
import Logger from "js-logger";
import { LibraryCoversAttachmentQueue } from "../lib/powersync/libraryCoversAttatchmentQueue";
import { BookFilesAttachmentQueue } from "../lib/powersync/bookFilesAttatchmentQueue";
import { AvatarsAttachmentQueue } from "../lib/powersync/avatarsAttatchmentQueue";

Logger.useDefaults();

const LibraryCoversQueueContext = createContext<LibraryCoversAttachmentQueue | undefined>(undefined);
const BookFilesQueueContext = createContext<BookFilesAttachmentQueue | undefined>(undefined);
const AvatarsQueueContext = createContext<AvatarsAttachmentQueue | undefined>(undefined);

const useLibraryCoversQueue = () => useContext(LibraryCoversQueueContext);
const useBookFilesQueue = () => useContext(BookFilesQueueContext);
const useAvatarsQueue = () => useContext(AvatarsQueueContext);

const SupabaseContext = createContext<SupabaseConnector | null>(null);
const useSupabase = () => useContext(SupabaseContext);
const supabase: SupabaseConnector = new SupabaseConnector();

const powersyncDb = new PowerSyncDatabase({
	database: { dbFilename: "synced.db" },
	schema: AppSchema,
	flags: {
		useWebWorker: false,
	},
});

// await powersyncDb.execute("DELETE FROM attachments"); // do not remove ts bruh, only testing to delete queue if faulty queue.

const localDb: Database = await Database.load("sqlite:local.db");
const sessionDb: Database = await Database.load("sqlite:session.db");

const SystemProvider = ({ children }: { children: ReactNode }) => {
	const [connector] = useState<SupabaseConnector>(supabase);
	const [powerSync] = useState<PowerSyncDatabase>(powersyncDb);

	const [libraryCoversQueue] = useState<LibraryCoversAttachmentQueue | undefined>(() => {
		return new LibraryCoversAttachmentQueue({
			powersync: powerSync,
			storage: connector.libraryCoversStorage,
		});
	});

	const [bookFilesQueue] = useState<BookFilesAttachmentQueue | undefined>(() => {
		return new BookFilesAttachmentQueue({
			powersync: powerSync,
			storage: connector.bookFilesStorage,
		});
	});

	const [avatarsQueue] = useState<AvatarsAttachmentQueue | undefined>(() => {
		return new AvatarsAttachmentQueue({
			powersync: powerSync,
			storage: connector.avatarsStorage,
		});
	});

	useEffect(() => {
		(window as any)._powersync = powerSync;

		powerSync.init();

		if (libraryCoversQueue) {
			libraryCoversQueue.init();
		}

		if (bookFilesQueue) {
			bookFilesQueue.init();
		}

		if (avatarsQueue) {
			avatarsQueue.init();
		}

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
	}, [powerSync, connector, libraryCoversQueue, bookFilesQueue, avatarsQueue]);

	useEffect(() => {}, []);

	return (
		<Suspense fallback={<>Loading...</>}>
			<PowerSyncContext.Provider value={powerSync}>
				<SupabaseContext.Provider value={connector}>
					<LibraryCoversQueueContext.Provider value={libraryCoversQueue}>
						<BookFilesQueueContext.Provider value={bookFilesQueue}>
							<AvatarsQueueContext.Provider value={avatarsQueue}>
								{children}
							</AvatarsQueueContext.Provider>
						</BookFilesQueueContext.Provider>
					</LibraryCoversQueueContext.Provider>
				</SupabaseContext.Provider>
			</PowerSyncContext.Provider>
		</Suspense>
	);
};

export {
	supabase,
	useSupabase,
	SystemProvider,
	powersyncDb,
	localDb,
	sessionDb,
	useLibraryCoversQueue,
	useBookFilesQueue,
	useAvatarsQueue,
};
