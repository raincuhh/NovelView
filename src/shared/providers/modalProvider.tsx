import React, { PropsWithChildren, useMemo, useState } from "react";
import { ModalContext } from "../hooks/useModal";
import { Modals } from "../types/modal";

type ModalProviderProps = PropsWithChildren;

export default function ModalProvider({ children }: ModalProviderProps): React.JSX.Element {
   const [modals, setModals] = useState<Modals[]>([]);

   const open = (modal: Modals) => setModals((old) => [...old, modal]);

   const remove = () => setModals((old) => old.slice(0, old.length - 1));

   const removeAll = () => setModals([]);

   const contextValue = useMemo(
      () => ({
         modals,
         open,
         remove,
         removeAll,
      }),
      [modals, open, remove, removeAll],
   );

   return (
      <>
         <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
      </>
   );
}
