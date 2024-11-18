import React, { forwardRef, PropsWithChildren } from "react";

type ModalOverlayProps = React.HTMLAttributes<HTMLElement> & { modalId: string };

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
   ({ modalId, children, ...props }: ModalOverlayProps, ref) => {
      return (
         <>
            <div ref={ref} id={modalId} className="h-full w-full" {...props}>
               {children}
            </div>
         </>
      );
   },
);

export default ModalOverlay;
