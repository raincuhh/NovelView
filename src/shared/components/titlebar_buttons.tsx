import { invoke } from "@tauri-apps/api/core";
import { useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faXmark,
   faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { TitlebarButtonTypes } from "../lib/types";

type WindowState = {
   width?: number;
   height?: number;
};

type TitlebarButtonContainerProps = {
   close_button?: boolean;
   maximize_button?: boolean;
   minimize_button?: boolean;
   window_state?: WindowState;
};

type TitlebarButtonProps = {
   button_type: TitlebarButtonTypes;
   on_click?: (event: string) => void;
};

export function TitlebarButtonContainer({
   close_button,
   maximize_button,
   minimize_button,
   window_state,
}: TitlebarButtonContainerProps): JSX.Element {
   const handle_btn_event = useCallback(
      (event: string) => {
         switch (event) {
            case "minimize":
               invoke("minimize_window", {
                  window: window_state,
               });
               break;
            case "maximize":
               invoke("maximize_window", {
                  window: window_state,
                  state: window_state,
               });
               break;
            case "close":
               invoke("close_window", {
                  window: window_state,
               });
               break;
            default:
               break;
         }
      },
      [window_state]
   );

   return (
      <>
         <div className="flex flex-row-reverse top-0 right-0 pointer-events-none">
            {close_button === true ? (
               <TitlebarButton
                  button_type={TitlebarButtonTypes.close}
                  on_click={handle_btn_event}
               />
            ) : (
               <></>
            )}
            {maximize_button === true ? (
               <TitlebarButton
                  button_type={TitlebarButtonTypes.maximize}
                  on_click={handle_btn_event}
               />
            ) : (
               <></>
            )}
            {minimize_button === true ? (
               <TitlebarButton
                  button_type={TitlebarButtonTypes.minimize}
                  on_click={handle_btn_event}
               />
            ) : (
               <></>
            )}
         </div>
      </>
   );
}

function TitlebarButton({
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
         className={`w-12 h-titlebar-height cursor-pointer flex items-center z-layer-popup bg-base-40 justify-center ${
            "hover:" + button_hover[button_type]
         }`}
         onClick={() => {
            console.log("clicked");
            on_click?.(button_type);
         }}
      >
         <div className="px-4 pointer-events-none">
            {button_type ===
            TitlebarButtonTypes.maximize ? (
               <i className="bx bx-rectangle text-white pointer-events-none" />
            ) : (
               <FontAwesomeIcon
                  icon={icons[button_type]}
                  className="text-white pointer-events-none"
               />
            )}
         </div>
      </div>
   );
}
