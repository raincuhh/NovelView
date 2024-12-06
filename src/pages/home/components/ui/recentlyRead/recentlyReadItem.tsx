import React from "react";
import { Link } from "react-router-dom";
import { RecentlyReadMetadata } from "@/pages/home/types/recentlyRead";
import Skeleton from "react-loading-skeleton";

type RecentlyReadItemProps = { data: RecentlyReadMetadata; loading: boolean };

const RecentlyReadItem = ({
   data,
   loading,
}: RecentlyReadItemProps): React.JSX.Element => {
   //TODO: replacing loading... things with skeletons
   //TODO: calculate user progress based on (currentChapter / totalChapters) * 100, with the table of contents in the epub file.

   return (
      <>
         <li
            className="flex flex-col w-40 min-w-40 sm:w-44 sm:min-w-44 sm:p-3 sm:hover:bg-interactive-base-hover
               rounded-radius-md transition-colors duration-100 ease-in-out active:scale-[0.95]
               sm:active:scale-100"
         >
            <Link
               to={`/book/${data.bookId}`}
               className="w-full h-full gap-2 flex flex-col"
            >
               <div className="w-full h-3/4">
                  {loading ? (
                     <Skeleton height={"100%"} />
                  ) : (
                     <img
                        src={
                           data.coverUrl ||
                           "/assets/placeholders/backgrounds/bookCoverPlaceholder.png"
                        }
                        alt={data.title.concat(" Cover") || "recentlyReadCover"}
                        className="h-full bg-cover rounded-radius-md"
                     />
                  )}
               </div>
               <div className="w-full h-1/4 flex-col">
                  <div className="flex flex-col w-full justify-between">
                     <div className="flex w-full overflow-hidden text-fs-md font-weight-md text-normal">
                        {loading ? <Skeleton /> : <>{data.title}</>}
                     </div>
                     <div className="w-full">
                        {loading ? <Skeleton /> : <>{data.library}</>}
                     </div>
                  </div>
               </div>
            </Link>
         </li>
      </>
   );
};

export default RecentlyReadItem;
