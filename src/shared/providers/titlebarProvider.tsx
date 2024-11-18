import React, { PropsWithChildren, useEffect } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { isTauri } from "@tauri-apps/api/core";

type TitlebarProviderProps = PropsWithChildren & {};

export default function TitlebarProvider({ children }: TitlebarProviderProps): React.JSX.Element {
   const isMinWidthForTitlebar = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   const isTitlebarAvailable = isTauri() || (isTauri() && isMinWidthForTitlebar);

   //  useEffect(() => {
   //     console.log("is tauri?: ", isTauri());
   //     console.log("is titlebar available?: ", isTitlebarAvailable);
   //  }, []);

   return (
      <>
         {isTitlebarAvailable && (
            <>
               <div
                  id="titlebar"
                  className="fixed left-0 right-0 top-0 z-layer-window-titlebar h-8 w-full border-none"
                  data-tauri-drag-region
               >
                  <div className="text-text-normal">
                     <div className="absolute right-0 top-0 flex w-min flex-row-reverse"></div>
                  </div>
               </div>
            </>
         )}

         {children}
      </>
   );
}
