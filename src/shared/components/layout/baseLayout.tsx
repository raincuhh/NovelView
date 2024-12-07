import React, { PropsWithChildren } from "react";

type BaseLayoutProps = PropsWithChildren;

const BaseLayout = ({ children }: BaseLayoutProps): React.JSX.Element => {
   return (
      <>
         <div className="w-full h-full">{children}</div>
      </>
   );
};

export default BaseLayout;
