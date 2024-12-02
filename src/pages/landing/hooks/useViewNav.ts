import React, { createContext, useContext } from "react";

type ViewNavContextProps = {
   nav: React.JSX.Element;
   setNavTitle: (title: string) => void;
};

export const ViewNavContext = createContext<ViewNavContextProps | undefined>(undefined);

const useViewNav = (): ViewNavContextProps => {
   const context = useContext(ViewNavContext);

   if (!context) {
      throw new Error("useViewNav must be used within a ViewNavProvider");
   }
   return context;
};

export default useViewNav;
