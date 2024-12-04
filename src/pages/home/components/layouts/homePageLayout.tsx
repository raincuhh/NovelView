import React, { PropsWithChildren } from "react";

type HomePageLayoutProps = PropsWithChildren;

const HomePageLayout = ({ children }: HomePageLayoutProps): React.JSX.Element => {
   return (
      <>
         <div className="w-full min-h-dvh h-[200dvh]">
            <div className="pt-10 sm:pt-0 h-full">{children}</div>
         </div>
      </>
   );
};

export default HomePageLayout;
