import { column, Schema, Table } from "@powersync/web";

const profiles = new Table(
	{
		profile_id: column.integer, // INTEGER for primary key and auto increment
		user_id: column.text, // TEXT for UUID since SQLite doesnt support UUIDs
		username: column.text,
		email: column.text,
		gender: column.text, // TEXT for gender
		dob: column.text, // TEXT for datetime (timestamps can be stored as ISO strings)
		synced: column.integer, // INTEGER for boolean values
		created_at: column.text, // TEXT for timestamps
		updated_at: column.text, // TEXT for timestamps
	},
	{
		indexes: {
			username: ["username"],
			user_id: ["user_id"],
		},
	}
);

const libraries = new Table({
	library_id: column.integer, // INTEGER for primary key
	user_id: column.text, // TEXT for UUID
	name: column.text,
	description: column.text,
	cover_url: column.text,
	type: column.text, // TEXT for ENUMs
	synced: column.integer, // INTEGER for boolean values
	author: column.text,
	created_at: column.text,
	updated_at: column.text,
});

const books = new Table(
	{
		book_id: column.integer, // INTEGER for primary key
		library_id: column.integer, // INTEGER for foreign key reference
		user_id: column.text, // TEXT for UUID
		title: column.text,
		author: column.text,
		metadata: column.text, // TEXT for JSON data
		toc: column.text, // TEXT for JSON data
		cover_image_url: column.text,
		epub_url: column.text,
		is_saved: column.integer, // INTEGER for boolean values
		read_count: column.integer, // INTEGER for integer values
		last_read_at: column.text, // TEXT for datetime
		synced: column.integer, // INTEGER for boolean values
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: { user_id: ["user_id"] } }
);

const bookContents = new Table(
	{
		book_content_id: column.integer, // INTEGER for primary key
		book_id: column.integer, // INTEGER for foreign key reference
		content_json: column.text, // TEXT for JSON data
		parsing_version: column.integer,
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: { book_id: ["book_id"] } }
);

const userSettings = new Table(
	{
		setting_id: column.integer, // INTEGER for primary key
		user_id: column.text, // TEXT for UUID
		onboarding_completed: column.integer, // INTEGER for boolean values
		app_theme: column.text,
		app_accent: column.text,
		font_size: column.integer, // INTEGER for font size
		language: column.text,
		notifications_enabled: column.integer, // INTEGER for boolean values
		created_at: column.text,
		updated_at: column.text,
	},
	{ indexes: { user_id: ["user_id"] } }
);

export const AppSchema = new Schema({
	profiles,
	libraries,
	books,
	bookContents,
	userSettings,
});

export type Database = (typeof AppSchema)["types"];
export type ProfileRecord = Database["profiles"];
export type LibraryRecord = Database["libraries"];
export type BookRecord = Database["books"];
export type BookContentRecord = Database["bookContents"];
export type UserSettingRecord = Database["userSettings"];
