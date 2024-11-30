import { defineConfig } from "eslint-define-config";
import importPlugin from "eslint-plugin-import";
import boundariesPlugin from "eslint-plugin-boundaries";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default defineConfig([
   {
      files: ["src/**/*.{ts,tsx}"],
      rules: {
         "import/order": [
            "error",
            {
               groups: [
                  ["builtin", "external"],
                  ["internal", "parent", "sibling", "index"],
               ],
               pathGroups: [
                  { pattern: "@tauri-apps/**", group: "external" },
                  { pattern: "@app/**", group: "internal" },
                  { pattern: "@features/**", group: "internal" },
                  { pattern: "@pages/**", group: "internal" },
                  { pattern: "@shared/**", group: "internal" },
                  { pattern: "@widgets/**", group: "internal" },
               ],
               pathGroupsExcludedImportTypes: ["builtin"],
               "newlines-between": "always",
            },
         ],
         // "import/no-restricted-paths": [
         //    "error",
         //    {
         //       zones: [
         //          {
         //             target: "./src/features",
         //             from: "./src/features",
         //             message:
         //                "Direct imports from within features are not allowed. Use the public API (`index.ts`) instead.",
         //          },
         //          {
         //             target: "./src/pages",
         //             from: "./src/pages",
         //             except: ["./**"],
         //             message:
         //                "Direct imports from within pages are not allowed. Use the public API (`index.ts`) instead.",
         //          },
         //       ],
         //    },
         // ],
         "boundaries/element-types": [
            "error",
            {
               default: "disallow",
               rules: [
                  {
                     from: "@features/*",
                     disallow: ["@features/*", "@pages/*", "@app/*"],
                     message:
                        "Features should not import from other features, pages, and app.",
                  },
                  {
                     from: "@pages/*",
                     disallow: ["@pages/*", "@features/*", "@app/*"],
                     allow: ["@widgets/*", "@shared/*", "./**"],
                     message:
                        "Pages should only import from widgets, shared, entities, and app.",
                  },
                  {
                     from: "@widgets/*",
                     disallow: ["@features/*", "@pages/*", "@app/*"],
                     allow: ["./**", "@shared/*"],
                     message:
                        "Widgets should remain independent of features, pages, and app.",
                  },
                  {
                     from: "@shared/*",
                     disallow: ["@features/*", "@pages/*", "@app/*"],
                     allow: ["./**"],
                     message:
                        "Shared should remain decoupled from business logic, pages, and app.",
                  },
                  {
                     from: "@app/*",
                     allow: ["@pages/*", "@features/*", "@shared/*", "@widgets/*"],
                     message:
                        "App can import from pages, features, shared, and widgets to tie everything together.",
                  },
               ],
            },
         ],
      },
   },
   {
      files: [
         "*.config.js",
         "*.config.ts",
         ".prettierrc.json",
         ".postcss.config.cjs",
         ".vite.config.js",
         ".tailwind.config.cjs",
      ],
      rules: {
         "import/order": "off",
         "no-unused-vars": "off",
         "no-undef": "off",
      },
   },
   {
      ignores: [
         "**/node_modules/",
         ".git/",
         "src-tauri/target/",
         "tailwind.config.cjs",
         ".prettierrc.json",
      ],
   },
   {
      languageOptions: {
         parser,
         parserOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            project: "./tsconfig.json",
            extraFileExtensions: [".json"],
         },
      },
      plugins: {
         import: importPlugin,
         boundaries: boundariesPlugin,
         "@typescript-eslint": typescriptPlugin,
      },
      settings: {
         "import/resolver": {
            typescript: {
               alwaysTryTypes: true,
               project: "./tsconfig.json",
            },
         },
      },
   },
]);
