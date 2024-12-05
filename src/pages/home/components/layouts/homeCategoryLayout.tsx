import React, { PropsWithChildren } from "react";

type HomeCategoryLayoutProps = PropsWithChildren;

const HomeCategoryLayout = ({ children }: HomeCategoryLayoutProps): React.JSX.Element => {
   return (
      <>
         <div className="px-4">{children}</div>
      </>
   );
};

export default HomeCategoryLayout;
