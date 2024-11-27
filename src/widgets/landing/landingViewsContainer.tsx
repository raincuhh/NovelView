import React from "react";
import { useViewSwitcher } from "../../shared/hooks/useViewSwitcher";
import { LandingPageViews } from "./landingPageContent";
import { motion, AnimatePresence } from "framer-motion";
import LandingHomeView from "./landingHomeView";
import LandingRegisterView from "./landingRegisterView";
import LandingLoginView from "./landingLoginView";

export default function LandingViewsContainer(): JSX.Element {
   const { currentView, changeView, isAnimating, direction, getDirection, navigate } =
      useViewSwitcher<LandingPageViews>();

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

   // const getDirection = (current: LandingPageViews, target: LandingPageViews): number => {
   //    let views = [
   //       LandingPageViews.home,
   //       LandingPageViews.login,
   //       LandingPageViews.register,
   //    ];
   //    return views.indexOf(target) > views.indexOf(current) ? 1 : -1;
   // };

   return (
      <>
         <div className="relative w-full h-full overflow-hidden">
            <div className="navigation">
               <button onClick={() => navigate(LandingPageViews.home)}>Home</button>
               <button onClick={() => navigate(LandingPageViews.login)}>Login</button>
               <button onClick={() => navigate(LandingPageViews.register)}>
                  Register
               </button>
            </div>
            <AnimatePresence mode="wait" custom={direction}>
               {currentView === LandingPageViews.home && (
                  <motion.div
                     key={LandingPageViews.home}
                     custom={direction}
                     initial="enter"
                     animate="center"
                     exit="exit"
                     variants={variants}
                     transition={{ duration: 0.1 }}
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
                     transition={{ duration: 0.1 }}
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
                     transition={{ duration: 0.1 }}
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
