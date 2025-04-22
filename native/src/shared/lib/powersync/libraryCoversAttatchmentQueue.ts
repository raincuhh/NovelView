import {
	AbstractAttachmentQueue,
	AttachmentRecord,
	AttachmentState,
	StorageAdapter,
} from "@powersync/attachments";
import { AppConfig } from "../supabase/appConfig";
import { Tables } from "./appSchema";
import { PowerSyncDatabase } from "@powersync/web";
import { LIBRARY_COVERS_BUCKET_ALLOWED_MIMETYPE } from "../consts";

export class LibraryCoversAttachmentQueue extends AbstractAttachmentQueue {
	constructor(options: {
		powersync: PowerSyncDatabase;
		storage: StorageAdapter;
		onDownloadError?: (attachment: AttachmentRecord, exception: any) => Promise<{ retry: boolean }>;
	}) {
		super({
			...options,
			// @ts-ignore
			onDownloadError: async (attachment: AttachmentRecord, exception: any) => {
				if (exception.toString() === "StorageApiError: Object not found") {
					return { retry: false };
				}
				return { retry: true };
			},
		});
	}

	async init() {
		if (!AppConfig.buckets.libraryCovers) {
			console.debug("Library covers bucket not configured.");
			this.options.syncInterval = 0;
			return;
		}
		await super.init();
	}

	onAttachmentIdsChange(onUpdate: (ids: string[]) => void): void {
		this.powersync.watch(`SELECT id FROM ${Tables.libraries.name} WHERE cover_url IS NOT NULL`, [], {
			onResult: (result) => onUpdate(result.rows?._array.map((r) => r.id) ?? []),
		});
	}

	async newAttachmentRecord(record?: Partial<AttachmentRecord>): Promise<AttachmentRecord> {
		const id = record?.id ?? crypto.randomUUID();
		return {
			id,
			filename: record?.filename ?? `${id}.jpg`,
			media_type: LIBRARY_COVERS_BUCKET_ALLOWED_MIMETYPE,
			state: AttachmentState.QUEUED_UPLOAD,
			...record,
		};
	}

	async saveAttachment(
		base64Data: string,
		localFilePath: string,
		id: string,
		filename: string
	): Promise<AttachmentRecord> {
		await this.storage.writeFile(localFilePath, base64Data);

		const attachment = await this.newAttachmentRecord({
			id,
			filename,
			media_type: LIBRARY_COVERS_BUCKET_ALLOWED_MIMETYPE,
			state: AttachmentState.QUEUED_UPLOAD,
			local_uri: localFilePath,
		});

		return this.saveToQueue(attachment);
	}
}
