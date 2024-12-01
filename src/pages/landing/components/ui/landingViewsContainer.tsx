import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useViewSwitcher } from "@/shared/hooks";
import { LandingPageViews } from "../../types";
import LandingHomeView from "./landingHomeView";
import LandingRegisterView from "./landingRegisterView";
import LandingLoginView from "./landingLoginView";
import LandingHeader from "./landingHeader";
import { useMediaQuery } from "@/shared/hooks";

const LandingViewsContainer = (): React.JSX.Element => {
   const { currentView, direction } = useViewSwitcher<LandingPageViews>();
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   const variants = {
      enter: (direction: number) => ({
         x: direction > 0 ? "120%" : "-120%",
         opacity: 0,
      }),
      center: {
         x: 0,
         opacity: 1,
      },
      exit: (direction: number) => ({
         x: direction < 0 ? "120%" : "-120%",
         opacity: 0,
      }),
   };

   return (
      <>
         <div className="relative flex-row w-full h-full">
            {isSm ? <LandingHeader includeLogo={true} /> : null}
            <AnimatePresence mode="popLayout" custom={direction}>
               {currentView === LandingPageViews.home && (
                  <motion.div
                     key={LandingPageViews.home}
                     custom={direction}
                     initial="center"
                     animate="center"
                     exit="exit"
                     variants={variants}
                     transition={{ duration: 0.3 }}
                     className={`inset-0 relative w-full h-full ${isSm ? "pt-12" : ""}`}
                  >
                     <LandingHomeView />
                  </motion.div>
               )}

               {currentView === LandingPageViews.register && (
                  <motion.div
                     key={LandingPageViews.register}
                     custom={direction}
                     initial="enter"
                     animate="center"
                     exit="exit"
                     variants={variants}
                     transition={{ duration: 0.3 }}
                     className={`inset-0 relative w-full h-full ${isSm ? "pt-12" : ""}`}
                  >
                     <LandingRegisterView />
                  </motion.div>
               )}
               {currentView === LandingPageViews.login && (
                  <motion.div
                     key={LandingPageViews.login}
                     custom={direction}
                     initial="enter"
                     animate="center"
                     exit="exit"
                     variants={variants}
                     transition={{ duration: 0.3 }}
                     className={`inset-0 relative w-full h-full ${isSm ? "pt-12" : ""}`}
                  >
                     <LandingLoginView />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </>
   );
};

export default LandingViewsContainer;
