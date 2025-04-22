export const AppConfig = {
	supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
	supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
	powersyncUrl: import.meta.env.VITE_POWERSYNC_URL,
	buckets: {
		bookFiles: import.meta.env.VITE_BUCKET_BOOK_FILES,
		avatars: import.meta.env.VITE_BUCKET_AVATARS,
		libraries: import.meta.env.VITE_BUCKET_LIBRARIES,
	},
};
