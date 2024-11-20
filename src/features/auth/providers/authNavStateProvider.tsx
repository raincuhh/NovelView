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
                  className={`fixed ${isTauri() && "pt-8"} dark:bg-background-primary dark:sm:bg-background-primary-alt
                     z-layer-menu w-full`}
               >
                  <Link to={backLocation}>
                     <div
                        className="dark:border-background-modifier-border-color flex h-min flex-col border-b-[1px]
                           border-solid px-4 py-2 sm:mx-auto sm:w-[50rem] sm:max-w-[90%] sm:border-none sm:px-2
                           sm:py-4"
                     >
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
               <div className="h-full">
                  <div className={`pb-10 ${isTauri() ? "!pb-[87.98px]" : ""}`}></div>
                  {children}
               </div>
            </AuthNavStateContext.Provider>
         </>
      );
   },
);

export default AuthNavStateProvider;
