import { TitlebarButtons } from "./titlebar_buttons";
import { TitlebarButtonTypes } from "../lib/types";

type TitleBarProps = {
   close_button?: boolean;
   maximize_button?: boolean;
   minimize_button?: boolean;
};

export default function TitleBar({}: TitleBarProps) {
   return (
      <>
         <div
            id="titlebar"
            className="h-titlebar-height w-full fixed z-layer-popup bg-base-30 border-none pointer-events-none"
            data-tauri-drag-region
         ></div>
      </>
   );
}
