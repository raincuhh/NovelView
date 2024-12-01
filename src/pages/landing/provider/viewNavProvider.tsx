import React, { useMemo, useState, forwardRef, PropsWithChildren } from "react";
import { ViewNavContext } from "../hooks/useViewNav";
import { Link } from "react-router-dom";
import { uppercaseify } from "@/shared/lib";
import { useMediaQuery } from "@/shared/hooks";
import { isTauri } from "@tauri-apps/api/core";
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
               className="dark:bg-primary dark:sm:bg-primary-alt z-layer-menu"
            >
               <div onClick={() => navigate(LandingPageViews.home)}>
                  <div className="py-4">back</div>
               </div>
               {/* {currentView === LandingPageViews.register && (
                  <>
                     <div>
                        <div className="dark:bg-primary dark:sm:bg-primary-alt">test</div>
                     </div>
                  </>
               )} */}
               {/* {currentView === LandingPageViews.login && (
                  <>
                     <div></div>
                  </>
               )} */}
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

// const AuthNavStateProvider = forwardRef<HTMLDivElement, ViewNavProps>(
//    ({ children, id }: ViewNavProps, ref) => {
//       const [title, setTitle] = useState<string>("back");
//       const [backLocation, setBackLocation] = useState<string>("/");

//       const ContextValue = useMemo(
//          () => ({
//             setTitle,
//             setBackLocation,
//          }),
//          [setTitle, setBackLocation],
//       );

//       return (
//          <>
//             <AuthNavStateContext.Provider value={ContextValue}>
//                <nav
//                   ref={ref}
//                   id={id}
//                   className={`fixed ${isTauri() && "pt-8"} dark:bg-background-primary dark:sm:bg-background-primary-alt
//                      z-layer-menu w-full`}
//                >
//                   <Link to={backLocation}>
//                      <div
//                         className="dark:border-background-modifier-border-color flex h-min flex-col border-b-[1px]
//                            border-solid px-4 py-2 sm:mx-auto sm:w-[50rem] sm:max-w-[90%] sm:border-none sm:px-2
//                            sm:py-4"
//                      >
//                         <div className="flex flex-row items-center gap-4">
//                            <div className="flex h-full w-min">
//                               <i className="bx bx-arrow-back text-fs-lg"></i>
//                            </div>
//                            {title && (
//                               <>
//                                  <div className="font-family-primary text-fs-md font-weight-md">
//                                     {uppercaseify(title)}
//                                  </div>
//                               </>
//                            )}
//                         </div>
//                      </div>
//                   </Link>
//                </nav>
//                <div className="h-full">
//                   <div className={`pb-10 ${isTauri() ? "!pb-[87.98px]" : ""}`}></div>
//                   {children}
//                </div>
//             </AuthNavStateContext.Provider>
//          </>
//       );
//    },
// );

// export default AuthNavStateProvider;
