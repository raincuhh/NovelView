import React, { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type SingleSidebarLayoutProps = PropsWithChildren & { side: React.JSX.Element };

const SingleSidebarLayout = ({
   side,
   children,
}: SingleSidebarLayoutProps): React.JSX.Element => {
   return (
      <>
         <div className="flex w-full relative h-screen overflow-hidden">
            <motion.aside
               initial={{ x: "-100%" }}
               drag="x"
               dragConstraints={{ left: 0, right: 0 }}
               onDragEnd={(e, info) => {
                  if (info.offset.x < -50) {
                     //close sidebar
                  }
               }}
               className="translate-x-[-100%] bg-interactive-base z-layer-sidebar fixed w-[90%] h-dvh"
            >
               {side}
            </motion.aside>
            <main className="relative flex-grow h-full overflow-y-auto">{children}</main>
         </div>
      </>
   );
};

export default SingleSidebarLayout;
