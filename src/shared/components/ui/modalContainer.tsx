import React from "react";
import { Modal } from "../../types/modal";
import { useModal } from "../../hooks/useModal";
import ModalOverlay from "../overlay/modalOverlay";
import RenderModalContent from "../utils/renderModalContent";

type ModalContainerProps = { modal: Modal };

export default function ModalContainer({ modal }: ModalContainerProps): React.JSX.Element {
   const { remove } = useModal();

   return (
      <>
         <div
            id="modal"
            className="overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${modal.id}`}
            aria-describedby={`modal-desc-${modal.id}`}
         >
            <ModalOverlay modalId={modal.id} onClick={() => remove()}>
               <RenderModalContent modal={modal} />
            </ModalOverlay>
         </div>
      </>
   );
}