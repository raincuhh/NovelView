import { defineConfig } from "eslint-define-config";
import importPlugin from "eslint-plugin-import";
import boundariesPlugin from "eslint-plugin-boundaries";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default defineConfig([
   {
      files: ["src/**/*.{ts,tsx}"],
      rules: {},
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
   // {
   //    files: ["**/src-tauri/target/**/*"],
   //    excludedFiles: ["**/src-tauri/target/**/*"],
   // },
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
         "boundaries/element-types": [
            "error",
            {
               // components: ["@components/*"],
               // pages: ["@pages/*"],
               // shared: ["@shared/*"],
               // features: ["@features/*"],
               // widgets: ["@widgets/*"],
               // app: ["@app/*"],
               default: "disallow",
               rules: [
                  {
                     from: "@features/*",
                     disallow: ["@features/*"],
                     message:
                        "Do not import other features. Use shared or widgets instead.",
                  },
                  {
                     from: "@pages/*",
                     disallow: ["@features/*", "@pages/*", "@widgets/*"],
                     message:
                        "Pages should not depend on features, widgets, or other pages.",
                  },
                  {
                     from: "@shared/*",
                     disallow: ["@features/*", "@pages/*"],
                     message: "Shared should remain decoupled from features and pages.",
                  },
                  {
                     from: "@widgets/*",
                     disallow: ["@features/*", "@pages/*"],
                     message:
                        "Widgets should be reusable and should not depend on features or pages.",
                  },
                  {
                     from: "@app/*",
                     disallow: ["@features/*", "@pages/*"],
                     message: "App-level logic should not depend on features or pages.",
                  },
               ],
            },
         ],
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

// import { defineConfig } from "eslint-define-config";

// export default defineConfig([
//    {
//       languageOptions: {
//          parser: "@typescript-eslint/parser",
//          parserOptions: {
//             ecmaVersion: 2021,
//             sourceType: "module",
//             project: "./tsconfig.json",
//          },
//       },
//       plugins: {
//          import: require("eslint-plugin-import"),
//          boundaries: require("eslint-plugin-boundaries"),
//          "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
//       },
//       rules: {
//          "import/order": [
//             "error",
//             {
//                groups: [
//                   ["builtin", "external"],
//                   ["internal", "parent", "sibling", "index"],
//                ],
//                pathGroups: [
//                   { pattern: "@app/**", group: "internal" },
//                   { pattern: "@features/**", group: "internal" },
//                   { pattern: "@pages/**", group: "internal" },
//                   { pattern: "@shared/**", group: "internal" },
//                   { pattern: "@widgets/**", group: "internal" },
//                ],
//                pathGroupsExcludedImportTypes: ["builtin"],
//                "newlines-between": "always",
//             },
//          ],
//          "boundaries/element-types": [
//             "error",
//             {
//                default: "disallow",
//                rules: [
//                   {
//                      from: "@features/*",
//                      disallow: ["@features/*"],
//                      message:
//                         "Do not import other features. Use shared or widgets instead.",
//                   },
//                   {
//                      from: "@pages/*",
//                      disallow: ["@features/*", "@pages/*", "@widgets/*"],
//                      message:
//                         "Pages should not depend on features, widgets, or other pages.",
//                   },
//                   {
//                      from: "@shared/*",
//                      disallow: ["@features/*", "@pages/*"],
//                      message: "Shared should remain decoupled from features and pages.",
//                   },
//                   {
//                      from: "@widgets/*",
//                      disallow: ["@features/*", "@pages/*"],
//                      message:
//                         "Widgets should be reusable and should not depend on features or pages.",
//                   },
//                   {
//                      from: "@app/*",
//                      disallow: ["@features/*", "@pages/*"],
//                      message: "App-level logic should not depend on features or pages.",
//                   },
//                ],
//             },
//          ],
//       },
//       settings: {
//          "import/resolver": {
//             typescript: {
//                alwaysTryTypes: true,
//             },
//          },
//       },
//    },
//    {
//       files: ["src/**/*.{ts,tsx}"],
//       rules: {},
//    },
// ]);
