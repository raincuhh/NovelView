// import type { Capacitor } from "@capacitor/core";

declare global {
   interface Window {
      __TAURI__: Record<string, unknown>;
   }
}
