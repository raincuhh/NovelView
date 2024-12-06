import React, { useState } from "react";
import { RecentlyReadMetadata } from "@/pages/home/types/recentlyRead";

type RecentlyReadItemProps = { data: RecentlyReadMetadata; loading: boolean };

const RecentlyReadItem = ({
   data,
   loading,
}: RecentlyReadItemProps): React.JSX.Element => {
   //TODO: replacing loading... things with skeletons
   return (
      <>
         <li
            className="flex flex-col gap-2 rounded-radius-md p-3 hover:bg-interactive-base-hover w-44 min-w-44
               transition-colors duration-100 ease-in-out"
         >
            <div className="w-full h-3/4">
               {loading ? (
                  <div
                     className="w-full h-full bg-interactive-base flex items-center justify-center font-weight-lg
                        text-muted rounded-radius-md"
                  >
                     loading...
                  </div>
               ) : (
                  <img
                     src={
                        data.coverUrl ||
                        "/assets/placeholders/backgrounds/bookCoverPlaceholder.png"
                     }
                     alt={data.title.concat("CoverBg") || "recentlyReadCoverBg"}
                     className="h-full bg-cover rounded-radius-md"
                  />
               )}
            </div>
            <div className="w-full h-1/4 flex-col">
               {loading ? (
                  <div>loading...</div>
               ) : (
                  <div className="flex break-normal text-fs-lg font-weight-lg">
                     {data.title}
                  </div>
               )}
            </div>
         </li>
      </>
   );
};

export default RecentlyReadItem;
