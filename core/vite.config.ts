import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// removethissuffixtextforvite@ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST || "localhost";

export default defineConfig({
	plugins: [
		TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
		react(),
		tsconfigPaths(),
		wasm(),
		topLevelAwait(),
	],
	clearScreen: false,
	assetsInclude: ["**/*.wasm"],
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		hmr: host
			? {
					protocol: "ws",
					host,
					port: 1421,
				}
			: undefined,
		watch: {
			ignored: ["**/node_modules/**", "**/dist/**", "**/src-tauri/**"],
		},
		// mimeTypes: {
		// 	"application/wasm": ["wasm"],
		// },
	},
	envPrefix: [
		"VITE_",
		"TAURI_PLATFORM",
		"TAURI_ARCH",
		"TAURI_FAMILY",
		"TAURI_PLATFORM_VERSION",
		"TAURI_PLATFORM_TYPE",
		"TAURI_DEBUG",
	],
	build: {
		// specifically for vinxi, (broken though)
		// rollupOptions: {
		// 	input: "./app/routes/__root.tsx",
		// },
		target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
		sourcemap: !!process.env.TAURI_DEBUG,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	esbuild: {
		target: "esnext",
	},
	optimizeDeps: {
		exclude: ["@journeyapps/wa-sqlite", "@powersync/web"],
		include: ["@powersync/web > js-logger"],
		esbuildOptions: {
			target: "esnext",
		},
	},
	worker: {
		format: "es",
		plugins: () => [wasm(), topLevelAwait()],
	},
});
