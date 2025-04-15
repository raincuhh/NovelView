import { db } from "@/shared/providers/systemProvider";
import { supabase } from "@/shared/providers/systemProvider";
import { create, mkdir, writeFile } from "@tauri-apps/plugin-fs";
import { LIBRARIES_FOLDER, BASE_DIR } from "../filesystem/consts";

type createLibraryProps = {
	name: string;
	cover: File | null;
	synced: boolean;
};

export async function createLibrary({ name, cover, synced }: createLibraryProps) {
	const localDir = `${LIBRARIES_FOLDER}/${name}`;
	try {
		await mkdir(localDir, { baseDir: BASE_DIR });
		await createLibraryMetadata(localDir, { name, synced });

		if (cover) await saveLibraryCover(localDir, cover);
	} catch (error) {
		console.error("Error creating library:", error);
	}
}

export async function createLibraryMetadata(
	libraryDir: string,
	{ name, synced }: { name: string; synced: boolean }
) {
	const metadata = {
		name,
		created_at: new Date().toISOString(),
		type: synced ? "sync" : "local",
	};

	const metadataJson = JSON.stringify(metadata);

	try {
		const file = await create(`${libraryDir}/metadata.json`, { baseDir: BASE_DIR });
		await file.write(new TextEncoder().encode(metadataJson));
		await file.close();
	} catch (error) {
		console.error("Error saving metadata:", error);
	}
}

export async function saveLibraryCover(libraryDir: string, cover: File) {
	try {
		const fileBytes = await cover.arrayBuffer();
		const fileExtension = cover.name.split(".").pop();

		if (!fileExtension) throw new Error("Cover file has no extension.");

		const coverFilePath = `${libraryDir}/cover.${fileExtension}`;

		await writeFile(coverFilePath, new Uint8Array(fileBytes), { baseDir: BASE_DIR });
	} catch (error) {
		console.error("Error saving cover:", error);
	}
}
