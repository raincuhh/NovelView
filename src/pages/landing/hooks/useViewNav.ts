import React, { createContext, useContext } from "react";

type ViewNavContextProps = {
   // setTitle?: (title: string) => void;
   // setBackLocation?: (location: string) => void;
   nav: React.JSX.Element;
   // setNav: React.Dispatch<React.SetStateAction<React.JSX.Element>>;
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
