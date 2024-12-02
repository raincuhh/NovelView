import React from "react";

import packageJson from "../../../../../../package.json";
import { BrandLogoIcon } from "@/shared/components/icons";

type LandingHomeHeaderProps = { includeLogo?: boolean };

const LandingHomeHeader = ({
   includeLogo = false,
}: LandingHomeHeaderProps): React.JSX.Element => {
   return (
      <>
         <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center font-family-primary">
               {includeLogo && (
                  <BrandLogoIcon
                     className="transition-colors duration-100 ease-in-out !w-32 !h-32 fill-interactive-accent
                        hover:fill-interactive-accent-hover"
                  />
               )}
               <header className="mt-2 sm:mt-2 text-fs-3xl font-weight-lg sm:text-fs-3xl sm:font-weight-xl">
                  NovelView
               </header>
               <p className="text-fs-sm sm:text-fs-md font-weight-md dark:text-faint">
                  v{packageJson.version}
               </p>
            </div>
         </div>
      </>
   );
};

export default LandingHomeHeader;
