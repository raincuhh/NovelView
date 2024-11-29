import React from "react";

import { useModal } from "@/shared/hooks";
import { Modal } from "@/shared/types";
import RenderList from "./renderList";
import ModalContainer from "../ui/modalContainer";

const ModalRoot = (): React.JSX.Element => {
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
};

export default ModalRoot;
