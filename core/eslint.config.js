import tseslint from "typescript-eslint";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import fsd from "eslint-plugin-fsd";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
	{
		ignores: ["dist", "node_modules", "build", "src-tauri"],
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.browser,
				process: "readonly",
			},
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			fsd,
			import: importPlugin,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

			"fsd/path-checker": ["error", { alias: "@" }],
			"fsd/public-api-imports": [
				"error",
				{
					alias: "@",
					testFilesPatterns: ["**/*.test.*", "**/*.stories.*"],
				},
			],
			"fsd/layer-imports": [
				"error",
				{
					alias: "@",
					ignoreImportPatterns: ["**/StoreProvider", "**/testing"],
				},
			],

			"import/order": [
				"warn",
				{ alphabetize: { order: "asc" }, groups: ["builtin", "external", "internal"] },
			],
		},
	}
);
