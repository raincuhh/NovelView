import React, { useMemo, useState, forwardRef, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { isTauri } from "@tauri-apps/api/core";
import { ArrowBackIcon } from "@/shared/components/icons";
import { ViewNavContext } from "../hooks/useViewNav";
import { useViewSwitcher } from "@/shared/hooks";
import { LandingPageViews } from "../types";

type ViewNavProviderProps = PropsWithChildren & { id?: string };

const ViewNavProvider = forwardRef<HTMLDivElement, ViewNavProviderProps>(
   ({ children, id }: ViewNavProviderProps, ref) => {
      const { currentView, navigate } = useViewSwitcher<LandingPageViews>();

      const renderNav = () => {
         return (
            <nav
               ref={ref}
               id={id}
               className="dark:bg-primary dark:sm:bg-primary-alt z-layer-menu cursor-pointer"
            >
               <div onClick={() => navigate(LandingPageViews.home)}>
                  <div
                     className="py-4 sm:pb-2 sm:py-0 border-solid sm:border-b-0 border-b-[1px]
                        border-modifier-border-color text-fs-lg"
                  >
                     <div className="flex flex-row items-center gap-2">
                        <ArrowBackIcon className="!h-6 !w-6 fill-normal" />
                        <div className="font-weight-lg">Back</div>
                     </div>
                  </div>
               </div>
            </nav>
         );
      };

      const contextValue = useMemo(
         () => ({
            nav: renderNav(),
         }),
         [currentView],
      );

      return (
         <>
            <ViewNavContext.Provider value={contextValue}>
               {children}
            </ViewNavContext.Provider>
         </>
      );
   },
);

export default ViewNavProvider;
