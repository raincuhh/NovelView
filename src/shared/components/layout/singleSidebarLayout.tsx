import React from "react";

type SingleSidebarLayoutProps = { side: React.JSX.Element; main: React.JSX.Element };

const SingleSidebarLayout = ({
   side,
   main,
}: SingleSidebarLayoutProps): React.JSX.Element => {
   return (
      <>
         <div className="flex flex-1">
            <div>{side}</div>
            <div>{main}</div>
         </div>
      </>
   );
};

export default SingleSidebarLayout;
