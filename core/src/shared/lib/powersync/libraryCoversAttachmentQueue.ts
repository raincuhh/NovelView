import { AbstractAttachmentQueue, AttachmentRecord, AttachmentState } from "@powersync/attachments";
import { AppConfig } from "../supabase/appConfig";
import { Tables } from "./appSchema";

// @ts-ignore
import { LIBRARY_COVERS_BUCKET_ALLOWED_MIMETYPE } from "../consts";
import { getFileExtension } from "../globalUtils";
import { Library } from "@/features/libraries/types";
import {
	createLibraryMetadata,
	getLocalLibraryCoverPath,
	getRemoteLibraryCoverPath,
	libraryFolderExists,
} from "@/features/libraries/lib/utils";
import { mkdir } from "@tauri-apps/plugin-fs";
import { LIBRARIES_FOLDER, LOCAL_APPDATA } from "@/features/fs/consts";

export class LibraryCoversAttachmentQueue extends AbstractAttachmentQueue {
	async init() {
		if (!AppConfig.buckets.libraries) {
			console.debug("Libraries bucket not configured.");
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
		const ext = getFileExtension(record?.filename ?? "jpg");

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
		const ext = getFileExtension(filename ?? "jpg");

		const attachment = await this.newAttachmentRecord({
			id,
			filename,
			media_type: `image/${ext}`,
			state: AttachmentState.QUEUED_UPLOAD,
			local_uri: localFilePath,
		});

		return this.saveToQueue(attachment);
	}

	async downloadAttachment(localFilePath: string, id: string, filename: string): Promise<AttachmentRecord> {
		const ext = getFileExtension(filename ?? "jpg");

		const attachment = await this.newAttachmentRecord({
			id,
			filename,
			media_type: `image/${ext}`,
			state: AttachmentState.QUEUED_DOWNLOAD,
			local_uri: localFilePath,
		});

		return this.saveToQueue(attachment);
	}

	async syncMissingLibraries(remoteLibraries: Library[], userId: string) {
		console.log("syncing missing libraries");
		for (const library of remoteLibraries) {
			if (!(await libraryFolderExists(library.id))) {
				const localDir = `${LIBRARIES_FOLDER}/${library.id}`;
				await mkdir(localDir, { baseDir: LOCAL_APPDATA });

				if (library.coverUrl) {
					const ext = getFileExtension(library.coverUrl ?? "jpg");
					const localFilePath = getLocalLibraryCoverPath(library.id, ext);
					const remotePath = getRemoteLibraryCoverPath(userId, library.id, ext);

					await this.downloadAttachment(localFilePath, library.id, remotePath);
				}

				await createLibraryMetadata(localDir, {
					name: library.name,
					type: library.type,
					coverUrl: library.coverUrl ?? null,
				});
			}
		}
	}
}
