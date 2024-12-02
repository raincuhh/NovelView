import { useMemo, forwardRef, PropsWithChildren, useState, useCallback } from "react";

import { LeftArrowAltIcon } from "@/shared/components/icons";
import { ViewNavContext } from "../hooks/useViewNav";
import { useViewSwitcher } from "@/shared/hooks";
import { LandingPageViews } from "../types";
import { uppercaseify, uppercaseifySentences } from "@/shared/lib";
import { useMediaQuery } from "@/shared/hooks";

type ViewNavProviderProps = PropsWithChildren & { id?: string };

const ViewNavProvider = forwardRef<HTMLDivElement, ViewNavProviderProps>(
   ({ children, id }: ViewNavProviderProps, ref) => {
      const { currentView, navigate } = useViewSwitcher<LandingPageViews>();
      const [navTitle, setNavTitle] = useState<string>("back");
      const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

      const stableSetNavTitle = useCallback((title: string) => {
         setNavTitle(title);
      }, []);

      const nav = useMemo(() => {
         const title = isSm ? "Back" : navTitle;
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
                        <LeftArrowAltIcon className="!h-6 !w-6 fill-normal" />
                        <div className="font-weight-lg">
                           {uppercaseifySentences(title)}
                        </div>
                     </div>
                  </div>
               </div>
            </nav>
         );
      }, [navTitle, isSm, navigate]);

      const contextValue = useMemo(
         () => ({
            nav,
            setNavTitle: stableSetNavTitle,
         }),
         [nav, navigate],
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
