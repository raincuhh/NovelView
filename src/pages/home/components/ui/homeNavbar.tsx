import React from "react";

import { UserAvatar } from "@/shared/components/ui";

const HomeNavbar = (): React.JSX.Element => {
   return (
      <>
         <div
            className="overscroll-none sticky w-full z-layer-header top-[-0.5px] left-0 h-14 border-solid
               border-modifier-border-color bg-primary sm:bg-primary-alt border-b-[1px]"
         >
            <div className="flex flex-row overflow-x-scroll py-2 px-4 h-full w-full gap-4 items-center">
               <UserAvatar className="w-8 h-8" />
               <header className="text-fs-xl font-weight-xl">Home</header>
            </div>
         </div>
      </>
   );
};

export default HomeNavbar;
