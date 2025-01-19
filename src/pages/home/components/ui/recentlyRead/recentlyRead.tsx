import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RenderList } from "@/shared/components/utils";
import RecentlyReadItem from "./recentlyReadItem";
import { RecentlyReadMetadata } from "@/pages/home/types/recentlyRead";
import { ChevronRightIcon } from "@/shared/components/icons";

const RecentlyRead = (): React.JSX.Element | null => {
   const [recentlyRead, setRecentlyRead] = useState<RecentlyReadMetadata[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const fetchRecentlyRead = async () => {
      try {
         setRecentlyRead([
            {
               title: "Red Rising",
               library: "main",
               bookId: "red-rising",
            },
            {
               title: "Lord of The Mysteries",
               library: "fantasythings",
               bookId: "lord-of-the-mysteries",
            },
            {
               title: "Shadow Slave",
               library: "dark",
               bookId: "shadow-slave",
            },
            {
               title: "Pursuit of Truth",
               library: "dark",
               bookId: "pursuit-of-truth",
            },
         ]);
         setTimeout(() => {
            setIsLoading(false);
            // simulating loading for now ig
         }, 1000);
      } catch (err) {
         console.error("Error fetching recently read: ", err);
      }
   };

   useEffect(() => {
      fetchRecentlyRead();
   }, []);

   return recentlyRead.length > 0 ? (
      <div className="flex flex-col">
         <header className="flex flex-row w-full justify-between items-center sm:px-3">
            <h1 className="text-fs-xl font-weight-xl hover:underline underline-offset-4">
               <Link to={"/recents"}>Recently Read</Link>
            </h1>
            <div className="text-fs-lg text-muted font-weight-lg hover:text-normal h-full items-center">
               <Link to={"/recents"}>
                  <div className="flex items-center">
                     <div>View All</div>
                     <ChevronRightIcon className="!h-6 !w-6 fill-muted" />
                  </div>
               </Link>
            </div>
         </header>
         <div className="mt-2 sm:mt-0">
            <ul
               className="flex overflow-x-scroll flex-row gap-4 sm:gap-0 snap-x snap-mandatory
                  ltr:scroll-pl-[calc(100vw-min(672px, 100%)/2)]"
            >
               <RenderList
                  data={recentlyRead}
                  render={(item: RecentlyReadMetadata, i: number) => (
                     <RecentlyReadItem
                        key={item.title || i}
                        data={item}
                        loading={isLoading}
                     />
                  )}
               />
            </ul>
         </div>
      </div>
   ) : null;
};

export default RecentlyRead;
