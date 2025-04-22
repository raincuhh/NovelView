import { AbstractAttachmentQueue, AttachmentRecord, AttachmentState } from "@powersync/attachments";
import { AppConfig } from "../supabase/appConfig";
import { Tables } from "./appSchema";
// @ts-ignore
import { AVATARS_BUCKET_ALLOWED_MIMETYPE } from "../consts";
import { getFileExtension } from "../globalUtils";

export class AvatarsAttachmentQueue extends AbstractAttachmentQueue {
	async init() {
		if (!AppConfig.buckets.avatars) {
			console.debug("Avatars bucket not configured.");
			this.options.syncInterval = 0;
			return;
		}
		await super.init();
	}

	onAttachmentIdsChange(onUpdate: (ids: string[]) => void): void {
		this.powersync.watch(`SELECT id FROM ${Tables.user_profiles.name} WHERE avatar_url IS NOT NULL`, [], {
			onResult: (result) => onUpdate(result.rows?._array.map((r) => r.id) ?? []),
		});
	}

	async newAttachmentRecord(record?: Partial<AttachmentRecord>): Promise<AttachmentRecord> {
		const id = record?.id ?? crypto.randomUUID();
		const ext = getFileExtension(record?.filename ?? "");

		return {
			id,
			filename: record?.filename ?? `${id}.jpg`,
			media_type: `image/${ext}`,
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
		const ext = getFileExtension(filename ?? "");

		const attachment = await this.newAttachmentRecord({
			id,
			filename,
			media_type: `image/${ext}`,
			state: AttachmentState.QUEUED_UPLOAD,
			local_uri: localFilePath,
		});

		return this.saveToQueue(attachment);
	}
}
