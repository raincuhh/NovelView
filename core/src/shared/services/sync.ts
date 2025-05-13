import { Library } from "@/features/libraries/types";
import { Tables } from "../lib/powersync/appSchema";
import { PowerSyncDatabase } from "@powersync/web";
import { LibraryCoversAttachmentQueue } from "../lib/powersync/libraryCoversAttachmentQueue";

export default class SyncService {
	private powersync: PowerSyncDatabase;
	private libraryCoversQueue: LibraryCoversAttachmentQueue;
	private userId: string;

	constructor(
		powersync: PowerSyncDatabase,
		libraryCoversQueue: LibraryCoversAttachmentQueue,
		userId: string
	) {
		this.powersync = powersync;
		this.libraryCoversQueue = libraryCoversQueue;
		this.userId = userId;
	}

	async init() {
		// await this.libraryCoversQueue.init();
		console.log("syncing libraries");
		this.watchLibraries();
	}

	private watchLibraries() {
		console.log("yookoso");
		this.powersync.watch(`SELECT * FROM ${Tables.libraries.name} WHERE type = 'synced'`, [], {
			onResult: async (result: any) => {
				console.log("result of powersync: ", result);
				const libraries: Library[] = result ?? [];
				await this.libraryCoversQueue.syncMissingLibraries(libraries, this.userId);
				await this.initializeLibraryParsing(libraries);
			},
		});
	}

	private async initializeLibraryParsing(libraries: Library[]) {
		for (const library of libraries) {
			console.log("starting parsing for library: ", library.name);
			// Initialize parsing for books in this library
			// You might want to check if parsing is already done
			// to avoid re-parsing unnecessarily
		}
	}
}
