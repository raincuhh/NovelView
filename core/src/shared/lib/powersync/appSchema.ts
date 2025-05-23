import { AttachmentTable } from "@powersync/attachments";
import { column, RowType, Schema, Table } from "@powersync/web";

const bookFilesTable = new AttachmentTable({
	name: "book_files",
});
const libraryCoversTable = new AttachmentTable({
	// attachmentDirectoryName: "customDir",
	name: "library_covers",
});
const avatarsTable = new AttachmentTable({
	name: "avatars",
});

const userProfilesTable = new Table(
	{
		// id column (text) is automatically included
		username: column.text,
		gender: column.text,
		dob: column.text,
		avatar_url: column.text,
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

export const userSettingsTable = new Table(
	{
		// id column (text) is automatically included
		metadata: column.text, // Usermetadata type
		theme: column.text,
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

const userReadingPrefsTable = new Table(
	{
		prefs: column.text, // UserReadingPrefsMetadata
	},
	{ indexes: {} }
);

export const premiumSubscriptionsTable = new Table(
	{
		// id column (text) is automatically included
		start_date: column.text,
		end_date: column.text,
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

export const librariesTable = new Table(
	{
		// id column (text) is automatically included
		user_id: column.text,
		name: column.text,
		description: column.text,
		cover_url: column.text,
		type: column.text, // "local" | "synced"
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

const booksTable = new Table(
	{
		// id column (text) is automatically included
		user_id: column.text,
		title: column.text,
		cover_image_url: column.text,
		file_url: column.text,
		format: column.text,
		created_at: column.text,
		updated_at: column.text,
		last_opened_at: column.text,
	},
	{ indexes: {} }
);

const libraryBooksTable = new Table(
	{
		// id column (text) is automatically included
		library_id: column.text,
		book_id: column.text,
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

const bookInfoTable = new Table(
	{
		// id column (text) is automatically included
		book_id: column.text,
		parsing_version: column.integer,
		metadata: column.text, // BookMetadata
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

export const AppSchema = new Schema({
	user_profiles: userProfilesTable,
	user_settings: userSettingsTable,
	user_reading_prefs: userReadingPrefsTable,
	premium_subscriptions: premiumSubscriptionsTable,
	libraries: librariesTable,
	books: booksTable,
	book_info: bookInfoTable,
	book_files: bookFilesTable,
	avatars: avatarsTable,
	library_covers: libraryCoversTable,
	library_books: libraryBooksTable,
});

export const Tables = {
	user_profiles: userProfilesTable,
	user_settings: userSettingsTable,
	user_reading_prefs: userReadingPrefsTable,
	premium_subscriptions: premiumSubscriptionsTable,
	libraries: librariesTable,
	books: booksTable,
	book_info: bookInfoTable,
	book_files: bookFilesTable,
	avatars: avatarsTable,
	library_covers: libraryCoversTable,
	library_books: libraryBooksTable,
} as const;

export type Database = (typeof AppSchema)["types"];
export type TableRow<T extends keyof typeof Tables> = RowType<(typeof Tables)[T]>;

// export type Profile = TableRow<"profiles">;
// export type UserSettings = TableRow<"user_settings">;
// export type Library = TableRow<"libraries">;
// export type PremiumSubscription = TableRow<"premium_subscriptions">;
// export type Book = TableRow<"books">;
// export type BookInfo = TableRow<"book_info">;
