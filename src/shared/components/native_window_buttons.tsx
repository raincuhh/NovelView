import { invoke } from "@tauri-apps/api/core";
import { useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faWindowMaximize,
   faWindowMinimize,
   faXmark,
   faMinus,
} from "@fortawesome/free-solid-svg-icons";

export function NativeWindowButtons(): JSX.Element {
   const handle_btn_event = useCallback((event: string) => {
      switch (event) {
         case "minimize":
            invoke("minimize_window", {});
            break;
         case "maximize":
            invoke("maximize_window", {});
            break;
         case "close":
            invoke("close_window", {});
            break;
         default:
            break;
      }
   }, []);

   return (
      <>
         <div className="flex flex-row-reverse fixed top-0 right-0">
            <NativeWindowButton
               button_type={NativeWindowButtonTypes.close}
               on_click={handle_btn_event}
            />
            <NativeWindowButton
               button_type={NativeWindowButtonTypes.minimize}
               on_click={handle_btn_event}
            />
         </div>
      </>
   );
}

enum NativeWindowButtonTypes {
   close = "close",
   minimize = "minimize",
   maximize = "maximize",
}

type NativeWindowButtonProps = {
   button_type: NativeWindowButtonTypes;
   on_click?: (event: string) => void;
};

function NativeWindowButton({
   button_type,
   on_click,
}: NativeWindowButtonProps): JSX.Element {
   const button_hover = {
      close: "bg-red-500",
      minimize: "bg-neutral-300",
      maximize: "bg-neutral-300",
   };

   const icons = {
      close: faXmark,
      minimize: faMinus,
      maximize: faWindowMaximize,
   };

   return (
      <div
         className={`w-12 h-[26px] cursor-pointer bg-neutral-500  flex items-center justify-center ${
            "hover:" + button_hover[button_type]
         }`}
         onClick={() => on_click?.(button_type)}
      >
         <div className="px-4">
            <FontAwesomeIcon icon={icons[button_type]} className="text-white" />
         </div>
      </div>
   );
}
