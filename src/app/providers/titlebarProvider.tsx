import React, { PropsWithChildren, useEffect } from "react";
import { isTauri } from "@tauri-apps/api/core";

import { useMediaQuery } from "@/shared/hooks";

type TitlebarProviderProps = PropsWithChildren & {};

const TitlebarProvider = ({ children }: TitlebarProviderProps): React.JSX.Element => {
   const isMinWidthForTitlebar = useMediaQuery({ mediaQuery: "(min-width: 640px)" });
   const isTitlebarAvailable = isTauri() || (isTauri() && isMinWidthForTitlebar);

   useEffect(() => {
      console.log("is tauri?: ", isTauri());
      console.log("is titlebar available?: ", isTitlebarAvailable);
   }, []);

   return (
      <>
         {isTitlebarAvailable && (
            <>
               <div
                  id="titlebar"
                  className="fixed top-0 left-0 right-0 w-full h-8 border-none z-layer-titlebar"
                  data-tauri-drag-region
               >
                  <div className="text-text-normal">
                     <div className="absolute top-0 right-0 flex flex-row-reverse w-min"></div>
                  </div>
               </div>
            </>
         )}

         {children}
      </>
   );
};

export default TitlebarProvider;
