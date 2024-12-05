import React from "react";

import { UserAvatar } from "@/shared/components/ui";

const HomeNavbar = (): React.JSX.Element => {
   return (
      <>
         <div
            className="sticky w-full top-[-0.5px] left-0 h-14 border-solid border-modifier-border-color
               bg-primary border-b-[1px]"
         >
            <div className="h-full w-full flex items-center px-4">
               <div className="flex flex-row overflow-x-scroll py-4 gap-4 h-full items-center">
                  <UserAvatar className="w-8 h-8" />
               </div>
            </div>
         </div>
      </>
   );
};

export default HomeNavbar;
