import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// removethissuffixtextforvite@ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST || "localhost";
const port = process.env.TAURI_PLATFORM === "android" ? 1421 : 1420;

console.log("Server Host:", host);
console.log("Server Port:", port);
console.log("HMR Host:", process.env.TAURI_DEV_HOST || "localhost");

export default defineConfig(async () => ({
	plugins: [react(), tsconfigPaths()],
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
}));
