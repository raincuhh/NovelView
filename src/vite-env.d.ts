/// <reference types="vite/client" />

import "vite";

declare module "vite" {
	interface UserConfig {
		worker?: {
			format?: "es" | "iife";
			plugins?: any[];
		};
	}
}

interface ImportMetaEnv {
	readonly VITE_SUPABASE_URL: string;
	readonly VITE_SUPABASE_ANON_KEY: string;
	readonly VITE_POWERSYNC_URL: string;
	readonly VITE_POWERSYNC_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
