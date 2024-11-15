import { TitleBarButtonContainer } from "./title_bar_button_container";
import { TitleBarButtonState } from "../../lib/types";

type TitleBarProps = TitleBarButtonState;

export default function TitleBar({ closeButton, maximizeButton, minimizeButton }: TitleBarProps) {
   return (
      <>
         <div
            id="titleBar"
            className="h-c-titlebar-height w-full fixed top-0 left-0 right-0 z-[99] bg-transparent border-none"
            data-tauri-drag-region
         >
            <div className="text-text-normal">
               <TitleBarButtonContainer
                  closeButton={closeButton}
                  maximizeButton={maximizeButton}
                  minimizeButton={minimizeButton}
               />
            </div>
         </div>
      </>
   );
}
