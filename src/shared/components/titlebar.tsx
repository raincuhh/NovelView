import { TitlebarButtonContainer } from "./titlebar_buttons";
import { TitlebarButtonTypes } from "../lib/types";

type TitleBarProps = {
   close_button?: boolean;
   maximize_button?: boolean;
   minimize_button?: boolean;
};

export default function TitleBar({
   close_button,
   maximize_button,
   minimize_button,
}: TitleBarProps) {
   return (
      <>
         <div
            id="titlebar"
            className="h-titlebar-height w-full fixed top-0 left-0 right-0 z-layer-popup bg-titlebar-bg border-none pointer-events-none"
            data-tauri-drag-region
         >
            <div className="text-text-primary">
               <TitlebarButtonContainer
                  close_button={close_button}
                  maximize_button={maximize_button}
                  minimize_button={minimize_button}
               />
            </div>
         </div>
      </>
   );
}
