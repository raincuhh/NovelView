import { RenderList } from "@/shared/components/utils";
import React, { useState } from "react";

const RecentFeed = (): React.JSX.Element => {
   const [recentList, setRecentList] = useState<[]>([]);

   return (
      <>
         <div className="flex flex-wrap flex-1">
            <RenderList
               data={recentList}
               render={(item: any, i: number) => <div key={i}>test</div>}
            />
         </div>
      </>
   );
};

export default RecentFeed;
