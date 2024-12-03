import React from "react";

import CoreNavbarItem from "./coreNavbarItem";
import { HomeIcon, LibraryIcon, HollowSearchIcon } from "@/shared/components/icons";

const CoreNavbar = (): React.JSX.Element => {
   return (
      <>
         <nav className="w-full fixed bottom-0 z-layer-menu">
            <div
               className="media-min-w-450:px-4 pt-4 flex justify-center w-full bg-gradient-to-t from-primary
                  to-transparent"
            >
               <ul className="flex gap-6 justify-between w-full max-w-[50%] pb-2">
                  <CoreNavbarItem
                     iconElement={
                        <HomeIcon className="fill-interactive-accent w-9 h-9" />
                     }
                     text="Home"
                     to="/home"
                  />
                  <CoreNavbarItem
                     iconElement={
                        <LibraryIcon className="fill-interactive-accent w-9 h-9" />
                     }
                     text="Libraries"
                     to="/libraries"
                  />
               </ul>
            </div>
         </nav>
      </>
   );
};

export default CoreNavbar;
