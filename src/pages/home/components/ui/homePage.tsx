import React from "react";

import { useEnvironment } from "@/shared/hooks";
import HomeNavbar from "./homeNavbar";
// import LibraryQuickAccess from "./libraryQuickAccess";
import RecentlyRead from "./recentlyRead/recentlyRead";
import RecentInteractions from "./recentInteractions/recentInteractions";
import UserStats from "./userStats";

const HomePage = (): React.JSX.Element => {
   const { isMobile } = useEnvironment();

   return (
      <>
         <div className="pt-10 h-[200dvh]">
            {isMobile && <HomeNavbar />}
            <div className="h-full mt-2 sm:mt-0 sm:px-0">
               <div className="flex flex-col gap-6 px-4">
                  <RecentInteractions />
                  <RecentlyRead />
                  <UserStats />
               </div>
            </div>
         </div>
      </>
   );
};

export default HomePage;
