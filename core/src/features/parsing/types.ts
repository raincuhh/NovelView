export type Chapter = {
	id: string;
	content: string;
};

export type ResourceInfo = {
	id: string;
	path: string;
};

export type EpubInfo = {
	title: string | null;
	author: string | null;
	resources: ResourceInfo[];
	spine: string[];
	cover: [Uint8Array, string] | null;
	chapters: Chapter[];
};
