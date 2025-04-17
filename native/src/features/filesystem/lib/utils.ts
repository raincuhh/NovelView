import { invoke } from "@tauri-apps/api/core";

// this doesnt work on client side, so not tsx... had to refac to rust
// import { exec } from "child_process";
// import { promisify } from "util";
// import { platform } from "os";
// import { basename } from "path";
// import fs from "fs/promises";

// const execAsync = promisify(exec);

// export async function hideFileOrFolder(path: string): Promise<void> {
// 	const currentOS = platform();

// 	try {
// 		if (currentOS === "win32") {
// 			await execAsync(
// 				`powershell -Command "Set-ItemProperty -Path '${path}' -Name Attributes -Value ([System.IO.FileAttributes]::Hidden)"`
// 			);
// 		} else if (currentOS === "linux" || currentOS === "darwin") {
// 			const name = basename(path);

// 			if (!name.startsWith(".")) {
// 				const newName = path.replace(/([^/\\]+)$/, `.${name}`);
// 				await fs.rename(path, newName);
// 			}
// 		} else {
// 			throw new Error(`Unsupported platform: ${currentOS}`);
// 		}

// 		console.log(`Hidden: ${path}`);
// 	} catch (err) {
// 		console.error(`Failed to hide '${path}':`, err);
// 	}
// }

export async function hideFileOrFolder(path: string) {
	try {
		await invoke("hide_file_or_folder", { path });
		// console.log(`Hidden: ${path}`);
	} catch (err) {
		console.error(`Failed to hide '${path}':`, err);
	}
}
