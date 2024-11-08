import { listen } from "@tauri-apps/api/event";
import {
   getCurrentWebviewWindow,
   WebviewWindow,
} from "@tauri-apps/api/webviewWindow";

//const is_tauri = window.__TAURI__;
export const is_tauri =
   typeof window !== "undefined" &&
   "__TAURI_INTERNALS__" in window;

console.log(is_tauri);

export function tauri_get_current_webview_window(): WebviewWindow | null {
   if (is_tauri) {
      return getCurrentWebviewWindow();
   }

   console.log(is_tauri);
   return null;
}
