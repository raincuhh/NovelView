import { listen } from "@tauri-apps/api/event";
import { getCurrentWebviewWindow, WebviewWindow } from "@tauri-apps/api/webviewWindow";

//const isTauri = window.__TAURI__;
export const isTauri = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

export function tauriGetCurrentWebViewWindow(): WebviewWindow | null {
   if (isTauri) {
      return getCurrentWebviewWindow();
   }

   console.log(isTauri);
   return null;
}