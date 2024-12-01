import React from "react";

import packageJson from "../../../../../package.json";
import { BrandLogoIcon } from "@/shared/components/icons";
import { useMediaQuery } from "@/shared/hooks";

type LandingHeaderProps = { includeLogo?: boolean };

const LandingHeader = ({
   includeLogo = false,
}: LandingHeaderProps): React.JSX.Element => {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   return (
      <>
         <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center font-family-primary">
               {includeLogo && (
                  <BrandLogoIcon
                     className="transition-colors duration-100 ease-in-out w-36 fill-interactive-accent
                        hover:fill-interactive-accent-hover"
                  />
               )}
               <header className="mt-2 sm:mt-2 text-fs-2xl font-weight-lg md:mt-4 sm:text-fs-3xl sm:font-weight-xl">
                  NovelView
               </header>
               <p className="text-fs-xs font-weight-md sm:text-fs-sm dark:text-faint">
                  v{packageJson.version}
               </p>
            </div>
         </div>
      </>
   );
};

export default LandingHeader;
