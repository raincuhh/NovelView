import React, { useEffect, useState } from "react";
// import packageJson from "../../../../../package.json";
// import BrandLogoIcon from "../../../../shared/components/ui/icons/brandLogoIcon";
// import { isTauri } from "@tauri-apps/api/core";
// import useMediaQuery from "../../../../shared/hooks/useMediaQuery";

export default function LandingHeader(): JSX.Element {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   return (
      <>
         <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center font-family-primary">
               <BrandLogoIcon
                  className="transition-colors duration-100 ease-in-out w-36 fill-interactive-accent
                     hover:fill-interactive-accent-hover"
               />
               <header className="mt-0 sm:mt-2 text-fs-l font-weight-lg md:mt-4 sm:text-fs-xl sm:font-weight-xl">
                  NovelView
               </header>
               <p className="text-fs-xs font-weight-md sm:text-fs-sm dark:text-faint">
                  v{packageJson.version}
               </p>
            </div>
         </div>
      </>
   );
}
