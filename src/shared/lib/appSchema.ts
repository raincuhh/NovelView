import { column, Schema, Table } from "@powersync/web";

const profiles = new Table(
	{
		// id column (text) is automatically included
		profile_id: column.text,
		user_id: column.text,
		username: column.text,
		email: column.text,
		gender: column.text,
		dob: column.text,
		synced: column.integer,
		avatar_url: column.text,
		created_at: column.text,
		updated_at: column.text,
	},
	{
		indexes: {
			username: ["username"],
			user_id: ["user_id"],
		},
	}
);

const user_settings = new Table(
	{
		// id column (text) is automatically included
		setting_id: column.text,
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
	{
		indexes: {
			user_id: ["user_id"],
		},
	}
);

const libraries = new Table(
	{
		// id column (text) is automatically included
		library_id: column.text,
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

const books = new Table(
	{
		// id column (text) is automatically included
		book_id: column.text,
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
	{
		indexes: {
			user_id: ["user_id"],
			library_id: ["library_id"],
		},
	}
);

const book_contents = new Table(
	{
		// id column (text) is automatically included
		book_content_id: column.text,
		book_id: column.text,
		content_json: column.text,
		parsing_version: column.integer,
		created_at: column.text,
		updated_at: column.text,
	},
	{
		indexes: {
			book_id: ["book_id"],
		},
	}
);

export const AppSchema = new Schema({
	profiles,
	user_settings,
	libraries,
	books,
	book_contents,
});

export type Database = (typeof AppSchema)["types"];

export type ProfileRecord = Database["profiles"];
export type LibraryRecord = Database["libraries"];
export type BookRecord = Database["books"];
export type BookContentRecord = Database["book_contents"];
export type UserSettingRecord = Database["user_settings"];

// import { column, Schema, Table } from "@powersync/web";

// const profiles = new Table(
// 	{
// 		id: column.text, // uuid
// 		user_id: column.text, // uuid
// 		username: column.text,
// 		email: column.text,
// 		gender: column.text, // ""
// 		dob: column.text, // iso
// 		synced: column.integer, // // boolean as integer (0/1)
// 		created_at: column.text, // iso
// 		updated_at: column.text, // iso
// 	},
// 	{
// 		indexes: {
// 			username: ["username"],
// 			user_id: ["user_id"],
// 		},
// 	}
// );

// const libraries = new Table(
// 	{
// 		id: column.text,
// 		user_id: column.text,
// 		name: column.text,
// 		description: column.text,
// 		cover_url: column.text,
// 		type: column.text, // "synced" | "local"
// 		synced: column.integer, // boolean as integer (0/1)
// 		author: column.text,
// 		created_at: column.text,
// 		updated_at: column.text,
// 	},
// 	{
// 		indexes: {
// 			user_id: ["user_id"],
// 		},
// 	}
// );

// const books = new Table(
// 	{
// 		id: column.text,
// 		library_id: column.text,
// 		user_id: column.text,
// 		title: column.text,
// 		author: column.text,
// 		metadata: column.text, // json
// 		toc: column.text, // json
// 		cover_image_url: column.text,
// 		epub_url: column.text,
// 		is_saved: column.integer, // boolean as integer (0/1)
// 		read_count: column.integer,
// 		last_read_at: column.text, // iso
// 		synced: column.integer, // boolean as integer (0/1)
// 		created_at: column.text, // iso
// 		updated_at: column.text, // iso
// 	},
// 	{
// 		indexes: {
// 			user_id: ["user_id"],
// 			library_id: ["library_id"],
// 		},
// 	}
// );

// const bookContents = new Table(
// 	{
// 		id: column.text,
// 		book_id: column.text,
// 		content_json: column.text, // json
// 		parsing_version: column.integer,
// 		created_at: column.text, // iso
// 		updated_at: column.text, // iso
// 	},
// 	{
// 		indexes: {
// 			book_id: ["book_id"],
// 		},
// 	}
// );

// const userSettings = new Table(
// 	{
// 		id: column.text, // uuid
// 		user_id: column.text, // uuid
// 		onboarding_completed: column.integer, // boolean as integer (0/1)
// 		app_theme: column.text,
// 		app_accent: column.text,
// 		font_size: column.integer,
// 		language: column.text,
// 		notifications_enabled: column.integer, // boolean as integer (0/1)
// 		created_at: column.text, // iso
// 		updated_at: column.text, // iso
// 	},
// 	{
// 		indexes: {
// 			user_id: ["user_id"],
// 		},
// 	}
// );

// export const AppSchema = new Schema({
// 	profiles,
// 	libraries,
// 	books,
// 	bookContents,
// 	userSettings,
// });

// export type Database = (typeof AppSchema)["types"];
// export type ProfileRecord = Database["profiles"];
// export type LibraryRecord = Database["libraries"];
// export type BookRecord = Database["books"];
// export type BookContentRecord = Database["bookContents"];
// export type UserSettingRecord = Database["userSettings"];
