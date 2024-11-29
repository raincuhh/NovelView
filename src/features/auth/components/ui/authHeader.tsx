import React from "react";
// import { Link } from "react-router-dom";
// import BrandLogoIcon from "../../../../shared/components/ui/icons/brandLogoIcon";
// import useMediaQuery from "../../../../shared/hooks/useMediaQuery";
// import { AuthModeTypes } from "../../lib/types";
// import { isTauri } from "@tauri-apps/api/core";

type AuthHeaderProps = { type: AuthModeTypes };

export default function AuthHeader({ type }: AuthHeaderProps): JSX.Element {
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });
   const titles: Record<AuthModeTypes, string> = {
      register: "Create an account",
      login: "Login to your account",
   };
   const descs: Record<AuthModeTypes, string> = {
      register:
         "Create a NovelView account to access premium features like syncing your library and enhancing your reading experience.",
      login: "Welcome back! Log in to continue exploring in your libraries and enjoy seamless reading across devices.",
   };
   const title = titles[type];
   const desc = descs[type];

   return (
      <>
         <header className="flex items-center justify-center h-min max-h-min font-family-primary">
            <div className="flex flex-col gap-4">
               <header className="flex flex-col items-center">
                  {!isTauri() ||
                     (!isSm && (
                        <>
                           <div className="cursor-pointer">
                              <Link to="/">
                                 <BrandLogoIcon className="w-40 transition-colors duration-100 ease-in-out fill-interactive-accent hover:fill-" />
                              </Link>
                           </div>
                        </>
                     ))}
                  <h1 className="mt-2 text-fs-xl font-weight-xl sm:text-fs-2xl sm:font-weight-xl">
                     {title}
                  </h1>
               </header>
               <p className="text-muted text-fs-md font-weight-md">{desc}</p>
            </div>
         </header>
      </>
   );
}
