import { tauri_get_current_webview_window } from "../../shared/lib/tauri_utils";
import { useEffect, useState } from "react";
import { use_environment } from "../../shared/lib/hooks";

import RegisterContent from "../../widgets/register/register_content";

export default function RegisterPage() {
   const { update_titlebar_buttons } = use_environment();
   const [is_tauri_app, set_is_tauri_app] =
      useState<boolean>(false);

   useEffect(() => {
      try {
         const window = tauri_get_current_webview_window();
         if (window) {
            set_is_tauri_app(true);
         } else {
            set_is_tauri_app(false);
         }
      } catch (err) {
         console.error("Error: ", err);
      }
   }, []);

   useEffect(() => {
      update_titlebar_buttons({
         close_button: true,
         maximize_button: false,
         minimize_button: true,
      });
   }, [is_tauri_app]);

   return (
      <>
         <RegisterContent />
      </>
   );
}
