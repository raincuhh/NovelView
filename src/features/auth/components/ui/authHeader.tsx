import React from "react";
import { Link } from "react-router-dom";
import MainLogo from "../../../../shared/components/ui/mainLogo";
import useMediaQuery from "../../../../shared/hooks/useMediaQuery";
import { AuthModeTypes } from "../../lib/types";

type AuthHeaderProps = { type: AuthModeTypes };

export default function AuthHeader({ type }: AuthHeaderProps): React.JSX.Element {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   const titles: Record<AuthModeTypes, string> = {
      register: "Create an account",
      login: "Login to your account",
   };

   const descs: Record<AuthModeTypes, string> = {
      register: "Making your NovelView account makes you eligible to purchase add-on services like sync.",
      login: "",
   };

   const title = titles[type];
   const desc = descs[type];

   return (
      <>
         <header className="flex h-min max-h-min items-center justify-center font-family-primary">
            <div className="flex flex-col gap-4">
               <header className="flex flex-col items-center">
                  <div className="cursor-pointer">
                     <Link to="/">
                        {!isSm && (
                           <>
                              <MainLogo variant="purple" className="w-36" />
                           </>
                        )}
                        {isSm && (
                           <>
                              <MainLogo variant="white" className="sm:w-48" />
                           </>
                        )}
                     </Link>
                  </div>
                  <h1 className="mt-2 text-fs-xl font-weight-xl sm:text-fs-2xl sm:font-weight-xl">{title}</h1>
               </header>
               <p className="text-fs-md font-weight-md text-text-muted">{desc}</p>
            </div>
         </header>
      </>
   );
}
