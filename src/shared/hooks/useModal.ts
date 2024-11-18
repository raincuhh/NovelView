import React, { createContext, useContext } from "react";
import { Modals } from "../types/modal";

type ModalContextProps = {
   modals: Modals[];
   open: (modal: Modals) => void;
   remove: () => void;
   removeAll: () => void;
};

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
   const context = useContext(ModalContext);

   if (!context) {
      throw new Error("useModal must be used within a ModalProvider");
   }

   return context;
};
