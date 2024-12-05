import React from "react";

import { useEnvironment } from "@/shared/hooks";
import HomeNavbar from "./homeNavbar";
import HomePageLayout from "../layouts/homePageLayout";
import LibraryQuickAccess from "./libraryQuickAccess";
import RecentlyRead from "./recentlyRead";
import RecentFeed from "./recentFeed";
import HomeCategoryLayout from "../layouts/homeCategoryLayout";

const HomePage = (): React.JSX.Element => {
   const { isMobile } = useEnvironment();
   // make the layout desktop like aswell. as in the side main side layout thing.
   return (
      <>
         <HomePageLayout>
            {isMobile && <HomeNavbar />}
            <div className="h-full mt-2 sm:mt-0 sm:px-0">
               <div className="flex flex-col gap-8">
                  <HomeCategoryLayout>
                     <RecentFeed />
                  </HomeCategoryLayout>
                  <HomeCategoryLayout>
                     <RecentlyRead />
                  </HomeCategoryLayout>
                  <HomeCategoryLayout>
                     <LibraryQuickAccess />
                  </HomeCategoryLayout>
               </div>
            </div>
         </HomePageLayout>
      </>
   );
};

export default HomePage;
