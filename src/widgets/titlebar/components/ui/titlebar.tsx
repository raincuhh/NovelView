import React from "react";

import { TitlebarButtonTypes } from "../../types/titlebar";
import TitlebarButton from "./titlebarButton";

type TitlebarProps = { titlebarButtons: TitlebarButtonTypes[] };

const Titlebar = ({ titlebarButtons }: TitlebarProps): React.JSX.Element => {
   return (
      <>
         <div
            className="fixed top-0 right-0 w-full h-8 border-none z-layer-titlebar"
            data-tauri-drag-region
         >
            <div className="text-normal">
               <div className="absolute top-0 right-0 flex flex-row w-min">
                  {titlebarButtons.includes("minimize") && (
                     <TitlebarButton type="minimize" />
                  )}
                  {titlebarButtons.includes("maximize") && (
                     <TitlebarButton type="maximize" />
                  )}
                  {titlebarButtons.includes("close") && <TitlebarButton type="close" />}
               </div>
            </div>
         </div>
      </>
   );
};

export default Titlebar;
