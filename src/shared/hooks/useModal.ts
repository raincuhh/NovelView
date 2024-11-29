import { createContext, useContext } from "react";
import { Modal } from "../types";

type ModalContextProps = {
   modals: Modal[];
   open: (modal: Modal) => void;
   remove: () => void;
   removeAll: () => void;
   removeById: (id: string) => void;
};

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

const useModal = (): ModalContextProps => {
   const context = useContext(ModalContext);

   if (!context) {
      throw new Error("useModal must be used within a ModalProvider");
   }

   return context;
};

export default useModal;
