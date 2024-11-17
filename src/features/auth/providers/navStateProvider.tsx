import React, { useMemo, useState, forwardRef, PropsWithChildren } from "react";
import { NavStateContext } from "../hooks/navStateHook";
import { Link } from "react-router-dom";

type NavStateProviderProps = PropsWithChildren & { id?: string };

const NavStateProvider = forwardRef<HTMLDivElement, NavStateProviderProps>(
   ({ children, id }: NavStateProviderProps, ref) => {
      const [title, setTitle] = useState<string>("placeholder");
      const [backLocation, setBackLocation] = useState<string>("/");

      const ContextValue = useMemo(
         () => ({
            setTitle,
            setBackLocation,
         }),
         [setTitle, setBackLocation]
      );

      return (
         <>
            <NavStateContext.Provider value={ContextValue}>
               <nav ref={ref} id={id} className="w-full">
                  <Link to={backLocation}>
                     <div className="flex flex-col px-4 py-2 sm:px-2 sm:py-4 h-min sm:mx-auto sm:w-[50rem] sm:max-w-[90%] border-solid dark:border-c-border-secondary border-b-[1px] sm:border-none">
                        <div className="flex flex-row gap-4 items-center">
                           <div className="h-full w-min flex">
                              <i className="bx bx-arrow-back text-c-fs-lg"></i>
                           </div>
                           {title && (
                              <>
                                 <div className="text-c-fs-md font-c-family-primary font-c-weight-md">
                                    {title}
                                 </div>
                              </>
                           )}
                        </div>
                     </div>
                  </Link>
               </nav>
               {children}
            </NavStateContext.Provider>
         </>
      );
   }
);

export default NavStateProvider;
