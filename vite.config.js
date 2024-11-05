import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
   clearScreen: false,

   plugins: [react()],
   server: {
      port: 3000,
      strictPort: true,
      open: true,
   },
   build: {
      target:
         process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
      outDir: "dist/",
      sourcemap: !!process.env.TAURI_DEBUG,
   },
});
