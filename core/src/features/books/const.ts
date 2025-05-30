import { Book } from "./types";

export const MOCK_BOOKS: Book[] = [
	{
		id: "fc27d3fc-58cb-342f-be18-b49662b5650b",
		userId: "user1",
		title: "Shadow Slave",
		coverImageUrl: "https://example.com/shadow-slave.jpg",
		lastReadAt: "2025-04-17T14:35:00Z",
		createdAt: "2025-04-01T09:00:00Z",
		updatedAt: "2025-04-17T14:35:00Z",
		fileUrl: "fc27d3fc-58cb-342f-be18-b49662b5650b/source.epub",
		format: "epub",
	},
	{
		id: "fc27d3fc-58cb-342f-be18-b49662b5650b",
		userId: "user1",
		title: "Red Rising",
		coverImageUrl: "https://example.com/red-rising.jpg",
		lastReadAt: "2025-04-17T14:35:00Z",
		createdAt: "2025-04-01T09:00:00Z",
		updatedAt: "2025-04-17T14:35:00Z",
		fileUrl: "fc27d3fc-58cb-342f-be18-b49662b5650b/source.epub",
		format: "epub",
	},
	{
		id: "fc27d3fc-58cb-342f-be18-b49662b5650b",
		userId: "user1",
		title: "Golden Son",
		coverImageUrl: "https://example.com/golden-son.jpg",
		lastReadAt: "2025-04-15T10:20:00Z",
		createdAt: "2025-03-28T11:15:00Z",
		updatedAt: "2025-04-15T10:20:00Z",
		fileUrl: "fc27d3fc-58cb-342f-be18-b49662b5650b/source.epub",
		format: "epub",
	},
	{
		id: "fc27d3fc-58cb-342f-be18-b49662b5650b",
		userId: "user1",
		title: "Morning Star",
		coverImageUrl: "https://example.com/morning-star.jpg",
		createdAt: "2025-04-10T08:00:00Z",
		updatedAt: "2025-04-10T08:00:00Z",
		fileUrl: "fc27d3fc-58cb-342f-be18-b49662b5650b/source.epub",
		format: "epub",
	},
];

export const LOCAL_BOOK_COVER_PATH_TEMPLATE = "books/{bookId}/cover.{ext}";
export const REMOTE_BOOK_COVER_PATH_TEMPLATE = "{userId}/{bookId}/cover.{ext}";
export const LOCAL_BOOK_FILES_PATH_TEMPLATE = "books/{bookId}/";
export const LOCAL_BOOK_SOURCE_FILE_PATH_TEMPLATE = "books/{bookId}/source.{ext}";
export const REMOTE_BOOK_FILES_PATH_TEMPLATE = "{userId}/{bookId}/";
export const REMOTE_BOOK_SOURCE_FILE_PATH_TEMPLATE = "{userId}/{bookId}/source.{ext}";
