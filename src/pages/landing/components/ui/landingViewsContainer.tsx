import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useViewSwitcher } from "@/shared/hooks";
import { LandingPageViews } from "../../types";
import LandingHomeView from "./landingHome/landingHomeView";
import LandingRegisterView from "./landingRegister/landingRegisterView";
import LandingLoginView from "./landingLogin/landingLoginView";
import LandingHomeHeader from "./landingHome/landingHomeHeader";
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
         <div className="flex-row w-full h-full">
            {isSm ? <LandingHomeHeader includeLogo={true} /> : null}
            <AnimatePresence mode="popLayout" custom={direction}>
               {currentView === LandingPageViews.home && (
                  <motion.div
                     key={LandingPageViews.home}
                     custom={direction}
                     initial="enter"
                     animate="center"
                     exit="exit"
                     variants={variants}
                     transition={{ duration: 0.3 }}
                     className={`inset-0 relative w-full h-min ${isSm ? "pt-8" : ""}`}
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
                     className={`inset-0 relative w-full h-min ${isSm ? "pt-8" : ""}`}
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
                     className={`inset-0 relative w-full h-min ${isSm ? "pt-8" : ""}`}
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
