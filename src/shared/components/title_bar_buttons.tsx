import { useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faXmark,
   faMinus,
} from "@fortawesome/free-solid-svg-icons";
import {
   TitleBarButtonState,
   TitleBarButtonTypes,
} from "../lib/types";
import {
   getCurrentWebviewWindow,
   WebviewWindow,
} from "@tauri-apps/api/webviewWindow";

type TitleBarButtonContainerProps = TitleBarButtonState;

type TitlebarButtonProps = {
   button_type: TitleBarButtonTypes;
   on_click?: (event: string) => void;
};

export function TitleBarButtonContainer({
   close_button,
   maximize_button,
   minimize_button,
}: TitleBarButtonContainerProps): JSX.Element {
   const window: WebviewWindow = getCurrentWebviewWindow();
   console.log(window);

   const handle_btn_event = useCallback((event: string) => {
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

function TitleBarButton({
   button_type,
   on_click,
}: TitlebarButtonProps): JSX.Element {
   const button_hover = {
      close: "bg-red-500",
      minimize: "bg-neutral-300",
      maximize: "bg-neutral-300",
   };

   const icons = {
      close: faXmark,
      minimize: faMinus,
   };

   return (
      <div
         className={`h-titlebar-height px-4 cursor-pointer flex items-center z-layer-menu bg-base-40 hover:bg-base-50 ${
            "hover:" + button_hover[button_type]
         }`}
         onClick={() => {
            console.log("clicked");
            on_click?.(button_type);
         }}
      >
         <div className="h-full flex justify-center items-center">
            {button_type ===
            TitleBarButtonTypes.maximize ? (
               <i className="bx bx-rectangle text-white" />
            ) : (
               <FontAwesomeIcon
                  icon={icons[button_type]}
                  className="text-white"
               />
            )}
         </div>
      </div>
   );
}
