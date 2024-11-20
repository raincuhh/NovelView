import React, { useEffect, useState } from "react";
import MainLogo from "../../shared/components/ui/mainLogo";
import packageJson from "../../../package.json";
import useMediaQuery from "../../shared/hooks/useMediaQuery";

export default function LandingHeader(): JSX.Element {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   return (
      <>
         <div className="flex flex-col items-center justify-center mb-16 sm:mb-20">
            <div className="flex flex-col items-center font-family-primary">
               {!isSm && (
                  <>
                     <MainLogo variant="purple" className="w-36 sm:w-44" />
                  </>
               )}
               {isSm && (
                  <>
                     <MainLogo variant="white" className="w-36 sm:w-44" />
                  </>
               )}
               <header className="mt-4 text-fs-xl font-weight-lg sm:mt-8 sm:text-fs-2xl sm:font-weight-xl">
                  NovelView
               </header>
               <p className="text-fs-xs font-weight-lg sm:text-fs-sm dark:text-text-faint">
                  v{packageJson.version}
               </p>
            </div>
         </div>
      </>
   );
}
