import React from "react";

import CoreNavbarItem from "./coreNavbarItem";
import { HomeIcon, LibraryIcon, UserIcon, PlusIcon } from "@/shared/components/icons";
import { useAuth } from "@/features/auth";

const CoreNavbar = (): React.JSX.Element => {
   const { isAuth } = useAuth();

   return (
      <>
         <nav className="w-full fixed bottom-0 z-layer-menu">
            <div className="pt-4 flex justify-center w-full bg-gradient-to-t from-primary to-transparent">
               <ul className="flex gap-12 justify-around w-full px-4">
                  <CoreNavbarItem
                     iconElement={
                        <HomeIcon className="fill-interactive-accent w-8 h-8" />
                     }
                     text="Home"
                     to="/home"
                  />
                  <CoreNavbarItem
                     iconElement={
                        <LibraryIcon className="fill-interactive-accent w-8 h-8" />
                     }
                     text="Libraries"
                     to="/libraries"
                  />

                  <CoreNavbarItem
                     iconElement={
                        <PlusIcon className="fill-interactive-accent w-8 h-8" />
                     }
                     text="Create"
                  />
               </ul>
            </div>
         </nav>
      </>
   );
};

export default CoreNavbar;
