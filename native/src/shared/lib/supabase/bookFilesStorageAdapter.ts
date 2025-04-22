import { SupabaseClient } from "@supabase/supabase-js";
import { decode as decodeBase64 } from "base64-arraybuffer";
import { StorageAdapter } from "@powersync/attachments";
import { AppConfig } from "./appConfig";
import { copyFile, create, exists, readTextFile, remove, writeFile } from "@tauri-apps/plugin-fs";
import { LOCAL_APPDATA } from "@/features/fs/consts";
import { getUserStoragePathSync } from "../fs/userStorage";

export interface SupabaseStorageAdapterOptions {
	client: SupabaseClient;
}

export class BookFilesStorageAdapter implements StorageAdapter {
	constructor(private options: SupabaseStorageAdapterOptions) {}

	async uploadFile(
		filename: string,
		data: ArrayBuffer,
		options?: {
			mediaType?: string;
		}
	): Promise<void> {
		if (!AppConfig.buckets) {
			throw new Error("Supabase bucket not configured in AppConfig.ts");
		}

		const { mediaType = "application/octet-stream" } = options ?? {};

		const blob = new Blob([data], { type: mediaType });

		const res = await this.options.client.storage.from(AppConfig.buckets.bookFiles).upload(filename, blob, {
			contentType: mediaType,
			upsert: true,
		});

		if (res.error) {
			throw res.error;
		}
	}

	async downloadFile(filePath: string): Promise<Blob> {
		if (!AppConfig.buckets) {
			throw new Error("Supabase bucket not configured in AppConfig.ts");
		}

		const { data, error } = await this.options.client.storage
			.from(AppConfig.buckets.bookFiles)
			.download(filePath);

		if (error) {
			throw error;
		}

		return data as Blob;
	}

	async writeFile(fileURI: string, base64Data: string): Promise<void> {
		const buffer = await this.base64ToArrayBuffer(base64Data);
		const uint8Buffer = new Uint8Array(buffer);
		await writeFile(fileURI, uint8Buffer, { baseDir: LOCAL_APPDATA });
	}

	async readFile(fileURI: string): Promise<ArrayBuffer> {
		const fileExists = await exists(fileURI);
		if (!fileExists) {
			throw new Error(`File does not exist: ${fileURI}`);
		}

		const content = await readTextFile(fileURI);
		return this.stringToArrayBuffer(content);
	}

	async deleteFile(fileURI: string, options?: { filename?: string }): Promise<void> {
		const fileExists = await exists(fileURI);
		if (fileExists) {
			await remove(fileURI);
		}

		const { filename } = options ?? {};
		if (!filename) return;

		if (!AppConfig.buckets) {
			throw new Error("Supabase buckets not configured in AppConfig.ts");
		}

		const { data, error } = await this.options.client.storage
			.from(AppConfig.buckets.bookFiles)
			.remove([filename]);

		if (error) {
			console.debug("Failed to delete file from cloud storage", error);
			throw error;
		}

		console.debug("Deleted file from storage", data);
	}

	async fileExists(fileURI: string): Promise<boolean> {
		return exists(fileURI);
	}

	async makeDir(uri: string): Promise<void> {
		const dirExists = await exists(uri);
		if (!dirExists) {
			await create(uri);
		}
	}

	async copyFile(sourceUri: string, targetUri: string): Promise<void> {
		await copyFile(sourceUri, targetUri);
	}

	getUserStorageDirectory(): string {
		return getUserStoragePathSync();
	}

	async stringToArrayBuffer(str: string): Promise<ArrayBuffer> {
		const encoder = new TextEncoder();
		return encoder.encode(str).buffer;
	}

	async base64ToArrayBuffer(base64: string): Promise<ArrayBuffer> {
		return decodeBase64(base64);
	}
}
