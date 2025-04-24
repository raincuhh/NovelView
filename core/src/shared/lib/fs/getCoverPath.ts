import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import { exists } from "@tauri-apps/plugin-fs";
import { LOCAL_APPDATA } from "@/features/fs/consts";

const possibleExtensions = ["jpg", "png", "webp", "jpeg"];

export async function getCoverPath(
	id: string,
	folder: string,
	cache: Record<string, string | null>,
	fallbackUrl?: string
): Promise<string | null> {
	if (cache[id]) return cache[id];

	const baseDir = await appLocalDataDir();

	for (const ext of possibleExtensions) {
		try {
			const relativePath = `${folder}/${id}/cover.${ext}`;
			const fullPath = await join(baseDir, relativePath);
			const fileExists = await exists(relativePath, { baseDir: LOCAL_APPDATA });

			if (fileExists) {
				const fileUrl = convertFileSrc(fullPath, "asset");
				cache[id] = fileUrl;
				return fileUrl;
			}
		} catch {
			// do nothing
		}
	}

	cache[id] = fallbackUrl ?? null;
	return cache[id];
}
