import React from "react";

import { useEnvironment } from "@/shared/hooks";
import HomeNavbar from "./homeNavbar";
import HomePageLayout from "../layouts/homePageLayout";
import LibraryQuickAccess from "./libraryQuickAccess";
import RecentlyRead from "./recentlyRead";
import RecentFeed from "./recentFeed/recentFeed";
import HomeCategoryLayout from "../layouts/homeCategoryLayout";

const HomePage = (): React.JSX.Element => {
   const { isMobile } = useEnvironment();
   return (
      <>
         <HomePageLayout>
            {isMobile && <HomeNavbar />}
            <div className="h-full mt-2 sm:mt-0 sm:px-0">
               <div className="flex flex-col gap-6">
                  <HomeCategoryLayout id="recent-feed">
                     <RecentFeed />
                  </HomeCategoryLayout>
                  <HomeCategoryLayout id="recently-read">
                     <RecentlyRead />
                  </HomeCategoryLayout>
                  <HomeCategoryLayout id="library-quick-access">
                     <LibraryQuickAccess />
                  </HomeCategoryLayout>
               </div>
            </div>
         </HomePageLayout>
      </>
   );
};

export default HomePage;
