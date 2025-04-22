import { invoke } from "@tauri-apps/api/core";

export async function hideFileOrFolder(path: string) {
	try {
		await invoke("hide_file_or_folder", { path });
		// console.log(`Hidden: ${path}`);
	} catch (err) {
		console.error(`Failed to hide '${path}':`, err);
	}
}
