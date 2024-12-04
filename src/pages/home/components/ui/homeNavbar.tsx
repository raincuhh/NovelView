import React from "react";

const HomeNavbar = (): React.JSX.Element => {
   return (
      <>
         <div
            className="sticky w-full top-[-0.5px] left-0 h-14 border-solid border-modifier-border-color
               bg-primary border-b-[1px]"
         >
            <div className="h-full w-full flex items-center px-4">
               <div className="text-fs-xl font-weight-lg">Home</div>
            </div>
         </div>
      </>
   );
};

export default HomeNavbar;
