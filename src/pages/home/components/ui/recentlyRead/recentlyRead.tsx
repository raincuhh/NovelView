import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RenderList } from "@/shared/components/utils";
import RecentlyReadItem from "./recentlyReadItem";
import { RecentlyReadMetadata } from "@/pages/home/types/recentlyRead";
import Skeleton from "react-loading-skeleton";

const RecentlyRead = (): React.JSX.Element | null => {
   const [recentlyRead, setRecentlyRead] = useState<RecentlyReadMetadata[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const fetchRecentlyRead = async () => {
      try {
         setRecentlyRead([
            {
               title: "Red Rising",
               library: "",
               bookId: "red-rising",
            },
            {
               title: "Lord of The Mysteries",
               library: "",
               bookId: "lord-of-the-mysteries",
            },
            {
               title: "Shadow Slave",
               library: "",
               bookId: "shadow-slave",
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
         <header className="flex flex-row w-full justify-between items-end">
            <h1 className="text-fs-2xl font-weight-xl">Recents</h1>
            <div className="text-fs-lg text-muted font-weight-lg hover:text-normal">
               <Link to={"/recents"}>View All</Link>
            </div>
         </header>
         <div className="mt-2 sm:mt-0">
            <ul className="flex overflow-x-scroll flex-row h-64 gap-4 sm:gap-0">
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
