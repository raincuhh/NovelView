import React, { PropsWithChildren, useMemo, useState } from "react";
import { ModalContext } from "../hooks/useModal";
import { Modal } from "../types/modal";

type ModalProviderProps = PropsWithChildren;

export default function ModalProvider({ children }: ModalProviderProps): JSX.Element {
   const [modals, setModals] = useState<Modal[]>([]);

   const open = (modal: Modal) => setModals((old) => [...old, modal]);

   const remove = () => setModals((old) => old.slice(0, old.length - 1));

   const removeAll = () => setModals([]);

   const removeById = (id: string) =>
      setModals((old) => old.filter((modal) => modal.id !== id));

   const contextValue = useMemo(
      () => ({
         modals,
         open,
         remove,
         removeAll,
         removeById,
      }),
      [modals, open, remove, removeAll, removeById],
   );

   return (
      <>
         <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
      </>
   );
}
