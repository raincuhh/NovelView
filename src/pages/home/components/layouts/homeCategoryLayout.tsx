import React, { PropsWithChildren } from "react";

type HomeCategoryLayoutProps = PropsWithChildren & { id?: string };

const HomeCategoryLayout = ({
   children,
   id,
}: HomeCategoryLayoutProps): React.JSX.Element | null => {
   if (children === null || children === undefined) {
      console.log("no children");
      return null;
   }

   return (
      <>
         <div className="px-4" id={id}>
            {children}
         </div>
      </>
   );
};

export default HomeCategoryLayout;
