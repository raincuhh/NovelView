import React, { forwardRef } from "react";

import { Modal } from "../../types/modal";

type RenderModalContentProps = React.HTMLAttributes<HTMLElement> & { modal: Modal };

const RenderModalContent = forwardRef<HTMLDivElement, RenderModalContentProps>(
   ({ modal, ...props }: RenderModalContentProps, ref) => {
      return (
         <>
            <div
               ref={ref}
               onClick={(e) => {
                  e.stopPropagation();
               }}
               {...props}
            >
               {modal.content}
            </div>
         </>
      );
   },
);

export default RenderModalContent;
