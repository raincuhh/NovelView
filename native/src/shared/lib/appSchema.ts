import { column, RowType, Schema, Table } from "@powersync/web";

export const profilesTable = new Table(
	{
		// id column (text) is automatically included
		user_id: column.text,
		username: column.text,
		gender: column.text,
		dob: column.text,
		created_at: column.text,
		updated_at: column.text,
		avatar_url: column.text,
	},
	{ indexes: {} }
);

export const userSettingsTable = new Table(
	{
		// id column (text) is automatically included
		user_id: column.text,
		onboarding_completed: column.integer,
		app_theme: column.text,
		app_accent: column.text,
		font_size: column.integer,
		language: column.text,
		notifications_enabled: column.integer,
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

export const premiumSubscriptionsTable = new Table(
	{
		// id column (text) is automatically included
		user_id: column.text,
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
		type: column.text,
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

export const booksTable = new Table(
	{
		// id column (text) is automatically included
		library_id: column.text,
		user_id: column.text,
		title: column.text,
		cover_image_url: column.text,
		is_saved: column.text,
		read_count: column.integer,
		last_read_at: column.text,
		created_at: column.text,
		updated_at: column.text,
		file_url: column.text,
		format: column.text,
	},
	{ indexes: {} }
);

export const bookContentsTable = new Table(
	{
		// id column (text) is automatically included
		book_id: column.text,
		content_json: column.text,
		parsing_version: column.integer,
		created_at: column.text,
		updated_at: column.text,
		metadata: column.text,
		toc: column.text,
		content_position: column.text,
	},
	{ indexes: {} }
);

export const readerStateTable = new Table(
	{
		// id column (text) is automatically included
		user_id: column.text,
		book_id: column.text,
		content_position: column.text,
		reading_progress: column.integer,
		is_fullscreen: column.text,
		last_read_at: column.text,
		created_at: column.text,
		updated_at: column.text,
	},
	{
		indexes: {},
	}
);

export const AppSchema = new Schema({
	profiles: profilesTable,
	user_settings: userSettingsTable,
	libraries: librariesTable,
	premium_subscriptions: premiumSubscriptionsTable,
	books: booksTable,
	book_contents: bookContentsTable,
	reader_state: readerStateTable,
});

export const Tables = {
	profiles: profilesTable,
	user_settings: userSettingsTable,
	libraries: librariesTable,
	premium_subscriptions: premiumSubscriptionsTable,
	books: booksTable,
	book_contents: bookContentsTable,
	reader_state: readerStateTable,
} as const;

export type Database = (typeof AppSchema)["types"];
export type TableRow<T extends keyof typeof Tables> = RowType<(typeof Tables)[T]>;

export type Profiles = TableRow<"profiles">;
export type UserSettings = TableRow<"user_settings">;
export type Libraries = TableRow<"libraries">;
export type PremiumSubscriptions = TableRow<"premium_subscriptions">;
export type Books = TableRow<"books">;
export type BookContents = TableRow<"book_contents">;
export type ReaderState = TableRow<"reader_state">;
