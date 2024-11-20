import React from "react";
import BrandLogoIcon from "../ui/icons/brandLogoIcon";

export default function SplashScreen(): JSX.Element {
   return (
      <>
         <div
            className="fixed flex flex-col min-w-full min-h-full overflow-hidden pointer-events-none select-none
               z-layer-splash"
         >
            <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
               <BrandLogoIcon
                  className="w-48 transition-colors duration-100 ease-in-out fill-interactive-accent
                     hover:fill-interactive-accent-hover"
               />
            </div>
         </div>
      </>
   );
}
