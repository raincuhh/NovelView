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
         [setTitle, setBackLocation],
      );

      return (
         <>
            <NavStateContext.Provider value={ContextValue}>
               <nav ref={ref} id={id} className="w-full">
                  <Link to={backLocation}>
                     <div className="dark:border-border-secondary flex h-min flex-col border-b-[1px] border-solid px-4 py-2 sm:mx-auto sm:w-[50rem] sm:max-w-[90%] sm:border-none sm:px-2 sm:py-4">
                        <div className="flex flex-row items-center gap-4">
                           <div className="flex h-full w-min">
                              <i className="bx bx-arrow-back text-fs-lg"></i>
                           </div>
                           {title && (
                              <>
                                 <div className="font-family-primary text-fs-md font-weight-md">{title}</div>
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
   },
);

export default NavStateProvider;
