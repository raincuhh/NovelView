import React from "react";

import { BrandLogoIcon } from "../icons";

const SplashScreen = (): React.JSX.Element => {
   return (
      <>
         <div
            className="fixed flex flex-col min-w-full min-h-full overflow-hidden pointer-events-none select-none
               z-layer-splash"
         >
            <div
               className="flex h-[100dvh] w-[100dvw] dark:bg-primary dark:sm:bg-primary-alt items-center
                  justify-center"
            >
               <BrandLogoIcon
                  className="!w-48 !h-48 transition-colors duration-100 ease-in-out fill-interactive-accent
                     hover:fill-interactive-accent-hover"
               />
            </div>
         </div>
      </>
   );
};

export default SplashScreen;
