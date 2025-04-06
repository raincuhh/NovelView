import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

// removethissuffixtextforvite@ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST || "localhost";
const port = process.env.TAURI_PLATFORM === "android" ? 1421 : 1420;

console.log("Server Host:", host);
console.log("Server Port:", port);
console.log("HMR Host:", process.env.TAURI_DEV_HOST || "localhost");
console.log(process.env.TAURI_PLATFORM);

export default defineConfig(async () => ({
	plugins: [react(), tsconfigPaths(), wasm(), topLevelAwait()],
	clearScreen: false,
	server: {
		port: port,
		strictPort: true,
		host: "0.0.0.0",
		hmr: {
			protocol: "ws",
			host: host,
			port: port + 1,
		},
		// hmr: host
		// 	? {
		// 			protocol: "ws",
		// 			host: process.env.TAURI_DEV_HOST || "localhost",
		// 			port: 1421,
		// 	  }
		// 	: undefined,
		watch: {
			ignored: ["**/node_modules/**", "**/dist/**", "**/src-tauri/**"],
		},
	},
	build: {
		rollupOptions: {
			input: "./app/routes/__root.tsx",
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	optimizeDeps: {
		// webworkers and wasm files
		exclude: ["@journeyapps/wa-sqlite", "@powersync/web"],

		// app breaks otherwise
		include: ["@powersync/web > js-logger"],
	},

	worker: {
		plugins: () => [wasm(), topLevelAwait()],
	},
}));
