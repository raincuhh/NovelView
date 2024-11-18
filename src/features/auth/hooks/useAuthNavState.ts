import React, { createContext, useContext } from "react";

type AuthNavStateContextProps = {
   setTitle: (title: string) => void;
   setBackLocation: (location: string) => void;
};

export const AuthNavStateContext = createContext<AuthNavStateContextProps | undefined>(undefined);

export const useAuthNavState = () => {
   const context = useContext(AuthNavStateContext);

   if (!context) {
      throw new Error("useAuthNavState must be used within a NavStateProvider");
   }
   return context;
};
