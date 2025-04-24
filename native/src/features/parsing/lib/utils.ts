import { getCurrentTimestamp } from "@/shared/lib/globalUtils";
import { EpubInfo, Chapter as ParsedChapter } from "../types";
import { Chapter } from "@/features/chapter/types";

export function logParsedEpubContents(epubObj: EpubInfo) {
	console.log("Parsed EPUB info:");
	console.log("Title:", epubObj.title);
	console.log("Author:", epubObj.author);

	console.log("Cover:", epubObj.cover ? `Available (${epubObj.cover[1]})` : "None");

	console.log("Resources:", epubObj.resources.length, "total");
	console.log("First 3 resources:", epubObj.resources.slice(0, 3));

	console.log("Spine length:", epubObj.spine.length);
	console.log("First 3 spine entries:", epubObj.spine.slice(0, 3));

	console.log("Chapters:", epubObj.chapters.length, "total");
	if (epubObj.chapters.length > 0) {
		console.log("First chapter ID:", epubObj.chapters[0].id);
		console.log("First chapter content (preview):", epubObj.chapters[0].content.slice(0, 300) + "...");
		console.log("First chapter content (full): ", epubObj.chapters[0].content);
	}
}

export function logFullParsedEpubContentsWithoutChapters(epubObj: EpubInfo) {
	console.log("Parsed EPUB info");
	console.log("Title:", epubObj.title);
	console.log("Author:", epubObj.author);
	console.log("Cover:", epubObj.cover ? `Available (${epubObj.cover[1]})` : "None");

	console.log("Resources:", epubObj.resources.length, "total");
	console.log("All resources:", epubObj.resources);

	const images = epubObj.resources.filter((r) => r.path.endsWith(".jpg") || r.path.endsWith(".png"));
	const fonts = epubObj.resources.filter((r) => r.path.endsWith(".ttf") || r.path.endsWith(".otf"));
	const htmlFiles = epubObj.resources.filter(
		(r) =>
			r.path.endsWith(".html") ||
			r.path.endsWith(".htm") ||
			r.path.endsWith(".xhtml") ||
			r.path.endsWith(".xml") ||
			r.path.endsWith(".opf") ||
			r.path.endsWith(".ncx") ||
			r.path.endsWith(".rss") ||
			r.path.endsWith(".svg")
	);

	console.log("Images:", images);
	console.log("Fonts:", fonts);
	console.log("HTML Files:", htmlFiles);

	console.log("Spine length:", epubObj.spine.length);
	console.log("All spine entries:", epubObj.spine);

	const chapterIds: string[] = [];

	if (epubObj.chapters.length > 0) {
		epubObj.chapters.forEach((chapter) => {
			chapterIds.push(chapter.id);
		});
	}
	console.log("All chapter ids: ", chapterIds);
}

/**
 * Converts the parsed chapters from EPUB into the normalized Chapter format.
 */
export function convertParsedChaptersToAppChapters(
	parsedChapters: ParsedChapter[],
	bookId: string
): Chapter[] {
	const now = getCurrentTimestamp();

	return parsedChapters.map((parsed, index): Chapter => {
		const chapterId = crypto.randomUUID();

		const wordCount = parsed.content?.split(/\s+/).length || 0;
		const estimatedReadingTime = Math.ceil(wordCount / 250); // avg 250 wpm

		return {
			id: chapterId,
			bookId,
			index,
			resourceUrl: `/books/${bookId}/resources/${chapterId}/parsed.html`,
			sourceHref: undefined,
			title: `Chapter ${index + 1}`,
			snippet: parsed.content.slice(0, 200),
			wordCount,
			estimatedReadingTime,
			isRead: false,
			isDownloaded: true,
			createdAt: now,
			updatedAt: now,
		};
	});
}
