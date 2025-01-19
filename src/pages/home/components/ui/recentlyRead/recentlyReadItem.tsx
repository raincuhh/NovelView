import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { RecentlyReadMetadata } from "@/pages/home/types/recentlyRead";

type RecentlyReadItemProps = { data: RecentlyReadMetadata; loading: boolean };

const RecentlyReadItem = ({
   data,
   loading,
}: RecentlyReadItemProps): React.JSX.Element => {
   //TODO: calculate user progress based on (currentChapter / totalChapters) * 100, with the table of contents in the epub file.

   return (
      <>
         <li
            className={`flex flex-col w-36 min-w-36 sm:w-48 sm:min-w-48 h-52 sm:h-60 sm:p-3
               sm:hover:bg-interactive-base-hover rounded-radius-md transition-colors duration-100
               ease-in-out active:scale-[0.95] active:grayscale sm:active:scale-100 sm:active:grayscale-0
               ${loading ? "pointer-events-none" : ""}`}
         >
            <Link
               to={`/book/${data.bookId}`}
               className={`w-full h-full gap-2 flex flex-col ${loading ? "pointer-events-none" : ""}`}
            >
               <div className="w-full aspect-[3/4] relative overflow-hidden">
                  {loading ? (
                     <Skeleton height={"100%"} />
                  ) : (
                     <img
                        src={
                           data.coverUrl ||
                           "/assets/placeholders/backgrounds/bookCoverPlaceholder.png"
                        }
                        alt={data.title.concat(" Cover") || "recentlyReadCover"}
                        className="absolute object-cover w-full h-full inset-0 bg-cover rounded-radius-md"
                     />
                  )}
               </div>
               <div className="w-full flex-col">
                  <div className="flex flex-col w-full justify-between h-full">
                     {loading ? (
                        <>
                           <Skeleton />
                           <Skeleton width={"50%"} />
                        </>
                     ) : (
                        <>
                           <div className="truncate max-w-full w-full text-fs-md font-weight-xl text-normal">
                              {data.title}
                           </div>
                           <div className="w-full flex flex-row gap-1 items-center">
                              <div className="text-fs-md font-weight-md text-muted">
                                 library
                              </div>
                              <div className="flex justify-center items-center">
                                 <div className="w-[3px] h-[3px] rounded-radius-full bg-base-60"></div>
                              </div>
                              <div className="text-fs-md font-weight-md text-muted w-full truncate">
                                 {data.library}
                              </div>
                           </div>
                        </>
                     )}
                  </div>
               </div>
            </Link>
         </li>
      </>
   );
};

export default RecentlyReadItem;
