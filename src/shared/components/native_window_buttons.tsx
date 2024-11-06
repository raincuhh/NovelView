import { invoke } from "@tauri-apps/api/core";
import { useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
         <div className="flex flex-row absolute top-0 right-0">
            <NativeWindowButton
               button_type={NativeWindowButtonTypes.close}
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
   const button_hover_css_list = {
      close: "",
      minimize: "",
      maximize: "",
   };

   const button_hover_color = (
      button_type_: NativeWindowButtonTypes
   ): string => {
      return button_hover_css_list[button_type_];
   };

   return (
      <div
         className="w-14 h-7 cursor-pointer bg-slate-800"
         onClick={() => on_click?.(button_type)}
      >
         <div className="px-4">
            <FontAwesomeIcon icon="xmark" />
         </div>
      </div>
   );
}
