import { tauri_get_current_webview_window } from "../../shared/lib/tauri_utils";
import { useEffect, useState } from "react";
import { useEnvironment } from "../../shared/lib/hooks";

import LandingContent from "../../widgets/landing/landing_content";

export default function LandingPage(): JSX.Element {
   const { updateTitleBarButtons } = useEnvironment();
   const [isTauriApp, setIsTauriApp] = useState<boolean>(false);

   useEffect(() => {
      try {
         const window = tauri_get_current_webview_window();
         if (window) {
            setIsTauriApp(true);
         } else {
            setIsTauriApp(false);
         }
      } catch (err) {
         console.error("Error: ", err);
      }
   }, []);

   useEffect(() => {
      updateTitleBarButtons({
         closeButton: true,
         maximizeButton: false,
         minimizeButton: true,
      });
   }, [isTauriApp]);

   return (
      <>
         <LandingContent />
      </>
   );
}
