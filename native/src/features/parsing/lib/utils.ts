import { EpubInfo } from "../types";

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
