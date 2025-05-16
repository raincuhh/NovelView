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
	mapLibraryRow,
} from "@/features/libraries/lib/utils";
import { exists, mkdir, writeFile } from "@tauri-apps/plugin-fs";
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
		// console.log("DOWNLAODING ATTACHMENT");
		const attachment = await this.newAttachmentRecord({
			id,
			filename,
			media_type: `image/${ext}`,
			state: AttachmentState.QUEUED_DOWNLOAD,
			local_uri: localFilePath,
		});

		const blob = await this.storage.downloadFile(filename);
		if (!blob) throw new Error(`No blob data received for ${filename}`);

		console.log("blob downloaded: ", blob);

		const arrayBuffer = await blob.arrayBuffer();
		const contents = new Uint8Array(arrayBuffer);

		await writeFile(localFilePath, contents, { baseDir: LOCAL_APPDATA });

		return this.saveToQueue(attachment);
	}

	async syncMissingLibraries(remoteLibraries: Library[], userId: string) {
		for (const rawLibrary of remoteLibraries) {
			const library = mapLibraryRow(rawLibrary);
			console.log("======");
			console.log("syncing: ", library);
			// console.log("Library keys: ", Object.keys(library));

			const libraryExists = await libraryFolderExists(library.id);

			if (!libraryExists) {
				// folder doesnt exist locally, and we just make everything from scratch.
				const localDir = `${LIBRARIES_FOLDER}/${library.id}`;
				await mkdir(localDir, { baseDir: LOCAL_APPDATA });

				await this.tryDownloadCover(library, userId);

				await createLibraryMetadata(localDir, {
					name: library.name,
					type: library.type,
					coverUrl: library.coverUrl ?? null,
				});
			} else {
				console.log("library folder exists for library: ", library.name);
				console.log(`coverUrl?: `, library.coverUrl);
				if (library.coverUrl) {
					const ext = getFileExtension(library.coverUrl);
					const localCoverPath = getLocalLibraryCoverPath(library.id, ext);
					const coverExists = await exists(localCoverPath, { baseDir: LOCAL_APPDATA });

					if (!coverExists) {
						console.log(`Cover file missing for library ${library.name}, downloading...`);
						const remotePath = getRemoteLibraryCoverPath(userId, library.id, ext);
						await this.downloadAttachment(localCoverPath, library.id, remotePath);
					}
				} else {
					console.log(`No cover URL for library ${library.name}, skipping cover check`);
				}

				const metadataPath = `${LIBRARIES_FOLDER}/${library.id}/metadata.json`;
				const metadataExists = await exists(metadataPath, { baseDir: LOCAL_APPDATA });
				if (!metadataExists) {
					console.log(`Metadata missing for ${library.name}, re-creating...`);
					await createLibraryMetadata(`${LIBRARIES_FOLDER}/${library.id}`, {
						name: library.name,
						type: library.type,
						coverUrl: library.coverUrl ?? null,
					});
				}
			}
		}
	}

	private async tryDownloadCover(library: Library, userId: string) {
		if (library.coverUrl) {
			const ext = getFileExtension(library.coverUrl);
			console.log("trying to download libCover:  ", library.coverUrl);
			const localPath = getLocalLibraryCoverPath(library.id, ext);
			const remotePath = getRemoteLibraryCoverPath(userId, library.id, ext);

			try {
				await this.downloadAttachment(localPath, library.id, remotePath);
			} catch (err: any) {
				console.error(`Failed to download cover for ${library.id}:`, err);
			}
		} else {
			console.log("No cover URL found for library:", library.id);
		}
	}
}
