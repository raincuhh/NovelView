import { useCallback } from "react";
import { TitleBarButtonState, TitleBarButtonTypes } from "../../lib/types";
import { tauriGetCurrentWebViewWindow } from "../../../../../../src/shared/lib/tauri";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import TitleBarButton from "./title_bar_button";

type TitleBarButtonContainerProps = TitleBarButtonState;

export function TitleBarButtonContainer({
   closeButton,
   maximizeButton,
   minimizeButton,
}: TitleBarButtonContainerProps): JSX.Element {
   const handleOnClick = useCallback((event: string) => {
      const window: WebviewWindow | null = tauriGetCurrentWebViewWindow();
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
         <div className="absolute top-0 right-0 flex flex-row-reverse w-min">
            {closeButton === true ? (
               <TitleBarButton
                  button_type={TitleBarButtonTypes.close}
                  on_click={handleOnClick}
               />
            ) : (
               <></>
            )}
            {maximizeButton === true ? (
               <TitleBarButton
                  button_type={TitleBarButtonTypes.maximize}
                  on_click={handleOnClick}
               />
            ) : (
               <></>
            )}
            {minimizeButton === true ? (
               <TitleBarButton
                  button_type={TitleBarButtonTypes.minimize}
                  on_click={handleOnClick}
               />
            ) : (
               <></>
            )}
         </div>
      </>
   );
}
