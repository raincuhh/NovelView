import { Library } from "@/features/libraries/types";
import { PowerSyncDatabase } from "@powersync/web";
import { LibraryCoversAttachmentQueue } from "../lib/powersync/libraryCoversAttachmentQueue";
import { BookFilesAttachmentQueue } from "../lib/powersync/bookFilesAttachmentQueue";
import { AvatarsAttachmentQueue } from "../lib/powersync/avatarsAttachmentQueue";
import { syncMissingLibraries } from "@/features/libraries/lib/insertLibraries";

export default class SyncService {
	private powersync: PowerSyncDatabase;
	private libraryCoversQueue: LibraryCoversAttachmentQueue;
	private bookFilesQueue: BookFilesAttachmentQueue;
	private avatarsQueue: AvatarsAttachmentQueue;
	private userId: string;

	constructor(
		powersync: PowerSyncDatabase,
		libraryCoversQueue: LibraryCoversAttachmentQueue,
		bookFilesQueue: BookFilesAttachmentQueue,
		avatarsQueue: AvatarsAttachmentQueue,
		userId: string
	) {
		this.powersync = powersync;
		this.libraryCoversQueue = libraryCoversQueue;
		this.bookFilesQueue = bookFilesQueue;
		this.avatarsQueue = avatarsQueue;
		this.userId = userId;
	}

	async init() {
		this.sync();
	}

	private async sync() {
		const librariesQuery = `SELECT * FROM libraries`;

		for await (const update of this.powersync.watch(librariesQuery, [])) {
			const libraries: Library[] = update.rows?._array ?? [];
			syncMissingLibraries(libraries, this.userId, this.libraryCoversQueue);
			this.initializeLibraryParsing(libraries);
		}
	}

	private async initializeLibraryParsing(libraries: Library[]) {
		for (const library of libraries) {
			console.log("starting parsing for library: ", library.name);
			// initializing parsing, might wanna check if already parsed to not do unecessary heavy operations.
			// but i would also check parse version for this aswell..
		}
	}
}
