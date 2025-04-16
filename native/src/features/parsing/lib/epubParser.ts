import { invoke } from "@tauri-apps/api/core";
import { EpubInfo } from "../types";

export async function parseEpub(epubPath: string): Promise<EpubInfo> {
	try {
		const result = await invoke<EpubInfo>("parse_epub", { filePath: epubPath });
		// console.log("Parsed EPUB:", result);
		return result;
	} catch (error) {
		console.error("Failed to parse EPUB:", error);
		throw error;
	}
}
