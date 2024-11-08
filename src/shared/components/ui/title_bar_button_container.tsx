import { useCallback } from "react";
import {
   TitleBarButtonState,
   TitleBarButtonTypes,
} from "../../lib/types";
import { tauri_get_current_webview_window } from "../../lib/tauri_utils";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import TitleBarButton from "./title_bar_button";

type TitleBarButtonContainerProps = TitleBarButtonState;

export function TitleBarButtonContainer({
   close_button,
   maximize_button,
   minimize_button,
}: TitleBarButtonContainerProps): JSX.Element {
   const handle_btn_event = useCallback((event: string) => {
      const window: WebviewWindow | null =
         tauri_get_current_webview_window();
      if (!window) return;

      switch (event) {
         case "minimize":
            window.minimize();
            break;
         case "maximize":
            window.toggleMaximize();
            break;
         case "close":
            window.close();
            break;
         default:
            break;
      }
   }, []);

   return (
      <>
         <div className="flex flex-row-reverse absolute top-0 right-0 w-min">
            {close_button === true ? (
               <TitleBarButton
                  button_type={TitleBarButtonTypes.close}
                  on_click={handle_btn_event}
               />
            ) : (
               <></>
            )}
            {maximize_button === true ? (
               <TitleBarButton
                  button_type={TitleBarButtonTypes.maximize}
                  on_click={handle_btn_event}
               />
            ) : (
               <></>
            )}
            {minimize_button === true ? (
               <TitleBarButton
                  button_type={TitleBarButtonTypes.minimize}
                  on_click={handle_btn_event}
               />
            ) : (
               <></>
            )}
         </div>
      </>
   );
}
