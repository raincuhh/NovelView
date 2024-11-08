import { TitleBarButtonContainer } from "./title_bar_button_container";
import { TitleBarButtonState } from "../../lib/types";

type TitleBarProps = TitleBarButtonState;

export default function TitleBar({
   close_button,
   maximize_button,
   minimize_button,
}: TitleBarProps) {
   return (
      <>
         <div
            id="titlebar"
            className="h-titlebar-height w-full fixed top-0 left-0 right-0 z-layer-popup bg-transparent border-none"
            data-tauri-drag-region
         >
            <div className="text-text-normal">
               <TitleBarButtonContainer
                  close_button={close_button}
                  maximize_button={maximize_button}
                  minimize_button={minimize_button}
               />
            </div>
         </div>
      </>
   );
}
