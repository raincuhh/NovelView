import type { Capacitor } from "@capacitor/core";

interface Window {
   Capacitor?: Capacitor;
   __TAURI__?: Record<string, unknown>;
   __TAURI_INTERNALS__?: Record<string, unknown>;
}
