const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;
const POWERSYNC_URL: string = import.meta.env.VITE_POWERSYNC_URL;
const POWERSYNC_TOKEN: string = import.meta.env.VITE_POWERSYNC_TOKEN;

export const env = {
	SUPABASE_URL,
	SUPABASE_ANON_KEY,
	POWERSYNC_URL,
	POWERSYNC_TOKEN,
};
