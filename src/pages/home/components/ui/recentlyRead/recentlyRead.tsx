import { RenderList } from "@/shared/components/utils";
import React, { useEffect, useState } from "react";
import RecentlyReadItem from "./recentlyReadItem";
import { RecentlyReadMetadata } from "@/pages/home/types/recentlyRead";
import { Link } from "react-router-dom";

const RecentlyRead = (): React.JSX.Element | null => {
   const [recentlyRead, setRecentlyRead] = useState<RecentlyReadMetadata[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const fetchRecentlyRead = async () => {
      setRecentlyRead([
         {
            title: "Red Rising",
            subTitle: "A tale of a revolution on Mars",
            desc: "A young man rises up to fight for his people in a brutal society.",
         },
         {
            title: "Lord of The Mysteries",
            subTitle: "The untold mysteries of an alternate world",
            desc: "A man reincarnates in a world full of mysticism, with strange powers.",
         },
         {
            title: "Something Else",
            subTitle: "A mystery unfolds",
            desc: "An unexpected journey into the unknown with surprises at every turn.",
         },
      ]);
      setTimeout(() => {
         setIsLoading(false);
         // simulating loading for now ig
      }, 1000);
   };

   useEffect(() => {
      fetchRecentlyRead();
   }, []);

   return recentlyRead.length > 0 ? (
      <div className="flex flex-col">
         <header className="flex flex-row w-full justify-between items-end">
            <h1 className="text-fs-2xl font-weight-xl">Recently Read</h1>
            <div className="text-fs-lg text-muted font-weight-lg hover:text-normal">
               <Link to={"/recently-read"}>View All</Link>
            </div>
         </header>
         <div className="py-4">
            <ul className="flex overflow-x-scroll flex-row h-64">
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
