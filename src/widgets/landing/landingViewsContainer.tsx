import React from "react";
import { useViewSwitcher } from "../../shared/hooks/useViewSwitcher";
import { LandingPageViews } from "./landingPageContent";
import { motion, AnimatePresence } from "framer-motion";
import LandingHomeView from "./landingHomeView";
import LandingRegisterView from "./landingRegisterView";
import LandingLoginView from "./landingLoginView";

export default function LandingViewsContainer(): JSX.Element {
   const { currentView, direction } = useViewSwitcher<LandingPageViews>();

   const variants = {
      enter: (direction: number) => ({
         x: direction > 0 ? "100%" : "-100%",
         opacity: 0,
      }),
      center: {
         x: 0,
         opacity: 1,
      },
      exit: (direction: number) => ({
         x: direction < 0 ? "100%" : "-100%",
         opacity: 0,
      }),
   };

   return (
      <>
         <div className="relative flex-row w-full h-full overflow-hidden">
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
                     className="inset-0"
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
                     className="inset-0"
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
                     className="inset-0"
                  >
                     <LandingLoginView />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </>
   );
}
