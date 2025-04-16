import { useEffect, useState } from "react";
import { getLibraryCoverPath } from "@/features/libraries/libraryService";

export function useLibraryCover(libraryId: string, retryDelay = 250) {
	const [coverPath, setCoverPath] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | null = null;

		const fetchCover = async () => {
			setLoading(true);
			try {
				const path = await getLibraryCoverPath(libraryId);
				setCoverPath(path);

				if (!path && retryDelay > 0) {
					timeout = setTimeout(async () => {
						const retryPath = await getLibraryCoverPath(libraryId);
						if (retryPath) setCoverPath(retryPath);
					}, retryDelay);
				}
			} catch (err) {
				console.error("Error loading cover: ", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCover();

		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [libraryId, retryDelay]);

	return { coverPath, loading };
}
