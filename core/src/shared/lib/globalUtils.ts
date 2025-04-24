import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const uppercaseify = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const uppercaseifySentences = (str: string): string => str.split(" ").map(uppercaseify).join(" ");

export const lowercaseify = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1);

export const lowercaseifySentences = (str: string): string => str.split(" ").map(lowercaseify).join(" ");

export const sqlTimestampToDate = (timestamp: string): Date | null => {
	const date = new Date(timestamp);
	return isNaN(date.getTime()) ? null : date;
};

export const sqlTimestampToDateVTwo = (timestamp: string): Date | null => {
	if (!timestamp || typeof timestamp !== "string") return null;
	const date = new Date(timestamp);
	return isNaN(date.getTime()) ? null : date;
};

export const sanitizeAndHyphenate = (str: string): string =>
	str
		.normalize("NFKD")
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.toLowerCase();

export const getTimeAgo = (date: Date): string => {
	if (!(date instanceof Date) || isNaN(date.getTime())) return "Invalid date";

	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
	const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 },
		{ label: "week", seconds: 604800 },
		{ label: "day", seconds: 86400 },
		{ label: "hour", seconds: 3600 },
		{ label: "minute", seconds: 60 },
		{ label: "second", seconds: 1 },
	];

	for (const { label, seconds: unit } of intervals) {
		const count = Math.floor(seconds / unit);
		if (count >= 1) return `${count} ${label}${count === 1 ? "" : "s"} ago`;
	}
	return "Just now";
};
export const formatTextWithLineBreaks = (text: string): string => {
	return text.replace(/\n+/g, '<span class="block mb-4"></span>');
};

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const censorStr = (str: string) => {
	return str.replace(/./g, "*");
};

export const older = (a: string, b: string): boolean => {
	a = a.replace(/[^\d.]/g, "");
	b = b.replace(/[^\d.]/g, "");
	const arrA = a.split(".").map((value) => Number(value));
	const arrB = b.split(".").map((value) => Number(value));
	try {
		for (let i = 0; i < Math.min(arrA.length, arrB.length); i++) {
			if (arrA[i] < arrB[i]) {
				return true;
			}
			if (arrA[i] > arrB[i]) {
				return false;
			}
		}
	} catch (e: any) {
		return arrA.length < arrB.length;
	}
	return false;
};

export const equal = (a: string, b: string): boolean => {
	a = a.replace(/[^\d.]/g, "");
	b = b.replace(/[^\d.]/g, "");
	const arrA = a.split(".").map((value) => Number(value));
	const arrB = b.split(".").map((value) => Number(value));
	if (arrA.length !== arrB.length) {
		return false;
	}
	for (let i = 0; i < arrA.length; i++) {
		if (arrA[i] !== arrB[i]) {
			return false;
		}
	}
	return true;
};

export const newer = (a: string, b: string): boolean => !older(a, b) && !equal(a, b);

export const sleep = (time: number): Promise<void> =>
	new Promise((resolve) => setTimeout(() => resolve(), time));

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
	let timer: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}

export function getFileExtension(filename: string): string {
	const parts = filename.split(".");
	return parts.length > 1 ? parts.pop()?.toLowerCase() || "" : "";
}

export function getCurrentTimestamp(): string {
	return new Date().toISOString();
}
