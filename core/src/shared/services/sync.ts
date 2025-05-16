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
		// console.log("syncing libraries");
		this.watchLibraries();
	}

	private async watchLibraries() {
		// console.log("yookoso");
		const query = `SELECT * FROM libraries`;

		for await (const update of this.powersync.watch(query, [])) {
			// console.log(update);
			const libraries: Library[] = update.rows?._array ?? [];
			await this.libraryCoversQueue.syncMissingLibraries(libraries, this.userId);
			await this.initializeLibraryParsing(libraries);
		}
	}

	private async initializeLibraryParsing(libraries: Library[]) {
		// for (const library of libraries) {
		// console.log("starting parsing for library: ", library.name);
		// initializing parsing, might wanna check if already parsed to not do unecessary heavy operations.
		// but i would also check parse version for this aswell..
		// }
	}
}
