import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../types/modal";
import RenderList from "./renderList";
import ModalContainer from "../ui/modalContainer";

export default function ModalRoot(): React.JSX.Element {
   const { modals } = useModal();

   return (
      <>
         <div>
            <RenderList
               data={modals}
               render={(modal: Modal, i) => (
                  <>
                     <ModalContainer key={i} modal={modal} />
                  </>
               )}
            />
         </div>
      </>
   );
}
