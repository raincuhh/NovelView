import React from "react";
import { useModal } from "../hooks/useModal";
import { Modals } from "../types/modal";
import RenderList from "../components/utils/renderList";

export default function ModalRoot() {
   const { modals, remove } = useModal();

   return (
      <>
         <div>
            {modals.map((modal: Modals, i: number) => (
               <>
                  <div key={i} id={modal.id}></div>
               </>
            ))}
         </div>
      </>
   );
}
