import { mkdir } from "@tauri-apps/plugin-fs";
import { LIBRARIES_FOLDER, LOCAL_APPDATA } from "@/features/fs/consts";
import { powersyncDb, localDb } from "@/shared/providers/systemProvider";
import { LibraryType } from "../types";
import { createLibraryMetadata, saveLibraryCover } from "./utils";

type createLibraryProps = {
	name: string;
	cover: File | null;
	type: LibraryType;
	userId: string;
	description?: string;
};

export async function createNewLibrary({ name, cover, type, userId, description }: createLibraryProps) {
	const id = crypto.randomUUID();
	const localDir = `${LIBRARIES_FOLDER}/${id}`;

	try {
		await mkdir(localDir, { baseDir: LOCAL_APPDATA });

		let coverUrl: string | null = null;

		if (cover) {
			const fileExtension = cover.name.split(".").pop();
			const coverFileName = `cover.${fileExtension}`;
			const coverPath = `${localDir}/${coverFileName}`;

			await saveLibraryCover(id, cover);

			coverUrl = coverPath;
			console.log("cover path: ", coverUrl);
		}

		await createLibraryMetadata(localDir, { name, type, coverUrl });

		switch (type) {
			case "sync":
				await powersyncDb.writeTransaction(async (tx) => {
					tx.execute(
						`INSERT INTO libraries (
							id,
							user_id,
							name,
							description,
							cover_url,
							type,
							created_at,
							updated_at
						) VALUES (?, ?, ?, ?, ?, ?, datetime(), datetime())`,
						[id, userId, name, description, coverUrl, type]
					);
				});

				break;
			case "local":
				localDb.execute(
					`INSERT INTO libraries (
						id,
						user_id,
						name,
						description,
						cover_url,
						type,
						created_at,
						updated_at
					) VALUES (?, ?, ?, ?, ?, ?, datetime(), datetime())`,
					[id, userId, name, description, coverUrl, type]
				);

				break;
			default:
				throw new Error(`Unknown library type: ${type}`);
		}
	} catch (err: any) {
		console.error("Error creating library:", err);
	}
}
