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

export class LibraryCoversStorageAdapter implements StorageAdapter {
	constructor(private options: SupabaseStorageAdapterOptions) {}

	async uploadFile(
		filename: string,
		data: ArrayBuffer,
		options?: {
			mediaType?: string;
		}
	): Promise<void> {
		if (!AppConfig.buckets) {
			console.error("Supabase bucket not configured in AppConfig.ts");
			throw new Error("Supabase bucket not configured in AppConfig.ts");
		}

		const { mediaType = "image/jpeg" } = options ?? {};

		console.log(`Uploading file:${filename} with media type: ${mediaType}`);
		const blob = new Blob([data], { type: mediaType });

		const res = await this.options.client.storage.from(AppConfig.buckets.libraries).upload(filename, blob, {
			contentType: mediaType,
			upsert: true,
		});

		if (res.error) {
			console.error("Upload error:", res.error);
			throw res.error;
		}
	}

	async downloadFile(filePath: string): Promise<Blob> {
		if (!AppConfig.buckets) {
			throw new Error("Supabase bucket not configured in AppConfig.ts");
		}
		console.log(`Downloading file from path:${filePath}`);
		const { data, error } = await this.options.client.storage
			.from(AppConfig.buckets.libraries)
			.download(filePath);

		if (error) {
			console.error("Download error:", error);
			throw error;
		}
		console.log("File downloaded successfully:", data);
		return data as Blob;
	}

	async writeFile(fileURI: string, base64Data: string): Promise<void> {
		console.log(`Writing file to URI:${fileURI}`);
		const buffer = await this.base64ToArrayBuffer(base64Data);
		const uint8Buffer = new Uint8Array(buffer);
		await writeFile(fileURI, uint8Buffer, { baseDir: LOCAL_APPDATA });

		console.log("File written successfully.");
	}

	async readFile(fileURI: string): Promise<ArrayBuffer> {
		console.log(`Reading file from URI:${fileURI}`);
		const fileExists = await exists(fileURI);
		if (!fileExists) {
			console.error(`File does not exist:${fileURI}`);
			throw new Error(`File does not exist: ${fileURI}`);
		}

		const content = await readTextFile(fileURI);
		console.log("File read successfully.");
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
			.from(AppConfig.buckets.libraries)
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
			console.log(`Directory created at URI:${uri}`);
		} else {
			console.log(`Directory already exists at URI:${uri}`);
		}
	}

	async copyFile(sourceUri: string, targetUri: string): Promise<void> {
		await copyFile(sourceUri, targetUri);
	}

	getUserStorageDirectory(): string {
		const userStoragePath = getUserStoragePathSync();

		console.log(`User storage directory:${userStoragePath}`);

		return userStoragePath;
	}

	async stringToArrayBuffer(str: string): Promise<ArrayBuffer> {
		const encoder = new TextEncoder();
		return encoder.encode(str).buffer;
	}

	async base64ToArrayBuffer(base64: string): Promise<ArrayBuffer> {
		return decodeBase64(base64);
	}
}
