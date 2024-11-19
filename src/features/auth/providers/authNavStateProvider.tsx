import React, { useMemo, useState, forwardRef, PropsWithChildren } from "react";
import { AuthNavStateContext } from "../hooks/useAuthNavState";
import { Link } from "react-router-dom";
import { uppercaseify } from "../../../shared/lib/utils";
import useMediaQuery from "../../../shared/hooks/useMediaQuery";
import { isTauri } from "@tauri-apps/api/core";

type AuthNavStateProviderProps = PropsWithChildren & { id?: string };

const AuthNavStateProvider = forwardRef<HTMLDivElement, AuthNavStateProviderProps>(
   ({ children, id }: AuthNavStateProviderProps, ref) => {
      const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

      const [title, setTitle] = useState<string>("back");
      const [backLocation, setBackLocation] = useState<string>("/");

      const ContextValue = useMemo(
         () => ({
            setTitle,
            setBackLocation,
         }),
         [setTitle, setBackLocation],
      );

      return (
         <>
            <AuthNavStateContext.Provider value={ContextValue}>
               <nav
                  ref={ref}
                  id={id}
                  className={`fixed ${isTauri() && "pt-8"} z-layer-menu w-full dark:bg-background-primary-mobile dark:sm:bg-background-primary`}
               >
                  <Link to={backLocation}>
                     <div className="flex h-min flex-col border-b-[1px] border-solid px-4 py-2 sm:mx-auto sm:w-[50rem] sm:max-w-[90%] sm:border-none sm:px-2 sm:py-4 dark:border-border-secondary">
                        <div className="flex flex-row items-center gap-4">
                           <div className="flex h-full w-min">
                              <i className="bx bx-arrow-back text-fs-lg"></i>
                           </div>
                           {title && (
                              <>
                                 <div className="font-family-primary text-fs-md font-weight-md">
                                    {uppercaseify(title)}
                                 </div>
                              </>
                           )}
                        </div>
                     </div>
                  </Link>
               </nav>
               <div className={`pb-8 ${isTauri() ? "pb-[87.98px]" : ""}`}></div>
               {children}
            </AuthNavStateContext.Provider>
         </>
      );
   },
);

export default AuthNavStateProvider;
