import { column, Schema, Table } from "@powersync/web";

const profiles = new Table(
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

const user_settings = new Table(
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

const libraries = new Table(
	{
		// id column (text) is automatically included
		user_id: column.text,
		name: column.text,
		description: column.text,
		cover_url: column.text,
		type: column.text,
		synced: column.integer,
		author: column.text,
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

const premium_subscriptions = new Table(
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

const books = new Table(
	{
		// id column (text) is automatically included
		library_id: column.text,
		user_id: column.text,
		title: column.text,
		author: column.text,
		metadata: column.text,
		toc: column.text,
		cover_image_url: column.text,
		epub_url: column.text,
		is_saved: column.integer,
		read_count: column.integer,
		last_read_at: column.text,
		synced: column.integer,
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

const book_contents = new Table(
	{
		// id column (text) is automatically included
		book_id: column.text,
		content_json: column.text,
		parsing_version: column.integer,
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: {} }
);

export const AppSchema = new Schema({
	profiles,
	user_settings,
	libraries,
	premium_subscriptions,
	books,
	book_contents,
});

export type Database = (typeof AppSchema)["types"];
export type BookContents = Database["book_contents"];
export type Books = Database["books"];
export type premiumSubscriptions = Database["premium_subscriptions"];
export type UserSettings = Database["user_settings"];
export type Profiles = Database["profiles"];
