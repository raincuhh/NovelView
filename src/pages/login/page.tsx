import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { useEffect, useState } from "react";

export default function LoginPage() {
   const [is_tauri_app, set_is_tauri_app] = useState(false);

   useEffect(() => {
      try {
         const window = getCurrentWebviewWindow();
         if (window) {
            set_is_tauri_app(true);
         } else {
            set_is_tauri_app(false);
         }
      } catch (err) {
         console.error("Error: ", err);
      }
   }, []);

   return (
      <>
         <div id="login" className="h-full">
            login
         </div>
      </>
   );
}
