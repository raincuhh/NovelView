import { createContext, useContext } from "react";

type NavStateContextProps = {
   setTitle: (title: string) => void;
   setBackLocation: (location: string) => void;
};

export const NavStateContext = createContext<NavStateContextProps | undefined>(undefined);

export const useNavState = () => {
   const context = useContext(NavStateContext);

   if (!context) {
      throw new Error("useNavState must be used within a NavStateProvider");
   }
   return context;
};
