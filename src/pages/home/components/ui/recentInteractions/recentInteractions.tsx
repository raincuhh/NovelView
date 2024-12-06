import React, { useEffect, useState } from "react";

import { RenderList } from "@/shared/components/utils";

const RecentInteractions = (): React.JSX.Element => {
   const [recentList, setRecentList] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      fetchRecentList();
   }, []);

   const fetchRecentList = async () => {
      setLoading(true);
      setTimeout(() => {
         setRecentList(["hello world", "yurr awdawdaw man"]);
         setLoading(false);
      }, 1000);
   };

   return (
      <>
         <div className="flex flex-wrap flex-1">
            {loading ? (
               <>loading...</>
            ) : (
               <>
                  {recentList.length <= 0 ? (
                     <>no recent activity found.</>
                  ) : (
                     <>
                        <RenderList
                           data={recentList}
                           render={(item: any, i: number) => <div key={i}>{item}</div>}
                        />
                     </>
                  )}
               </>
            )}
         </div>
      </>
   );
};

export default RecentInteractions;
