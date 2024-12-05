import React from "react";

import { useEnvironment } from "@/shared/hooks";

type DoubleSidebarLayoutProps = {
   leftSide: React.JSX.Element;
   centerSide: React.JSX.Element;
   rightSide: React.JSX.Element;
};

const DoubleSidebarLayout = ({
   leftSide,
   centerSide,
   rightSide,
}: DoubleSidebarLayoutProps): React.JSX.Element => {
   const { showTitlebar } = useEnvironment();

   return (
      <>
         <div className={`flex flex-1 w-full ${showTitlebar ? "pt-8" : ""}`}>
            {leftSide}
            {centerSide}
            {rightSide}
         </div>
      </>
   );
};

export default DoubleSidebarLayout;
