import React from "react";

import { Button } from "@/shared/components/ui";
import {
   ChevronRightIcon,
   PlusIcon,
   UserIcon,
   UserPlusIcon,
} from "@/shared/components/icons";
import { uppercaseifySentences } from "@/shared/lib";
import { LandingPageViews } from "@/pages/landing/types";
import { useViewSwitcher } from "@/shared/hooks";
import { useMediaQuery } from "@/shared/hooks";

type LandingHomeActionProps = {
   type: "login" | "register" | "createLibrary";
   view?: LandingPageViews;
};

const LandingHomeAction = ({ type, view }: LandingHomeActionProps): React.JSX.Element => {
   const { navigate } = useViewSwitcher();
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   const actionConfig: Record<
      LandingHomeActionProps["type"],
      { text: string; variant: "base" | "accent"; title: string; desc: string }
   > = {
      register: {
         text: "register",
         variant: "accent",
         title: "Create Your Account",
         desc: "Sign up to unlock premium features and syncing.",
      },
      login: {
         text: "login",
         variant: "base",
         title: "Welcome Back",
         desc: "Log in to access your synced libraries.",
      },
      createLibrary: {
         text: "create library",
         variant: "base",
         title: "Create Library",
         desc: "Create a library to contain your books.",
      },
   };

   const { text, variant, title, desc } = actionConfig[type];

   return (
      <>
         <div
            className={`w-full select-none flex flex-row sm:flex-row py-2 justify-between
               !border-modifier-border-color border-solid
               ${type === "register" ? "sm:border-b-[1px]" : "border-b-[1px]"}`}
         >
            {isSm && (
               <>
                  <div className="flex flex-col">
                     <header className="text-fs-lg font-weight-lg">{title}</header>
                     <p className="text-muted text-fs-md font-weight-md">{desc}</p>
                  </div>
               </>
            )}
            <Button
               size={isSm ? "desktop" : "lg"}
               variant={isSm ? variant : "ghost"}
               onClick={() => navigate(view)}
               className="sm:!justify-center flex items-center w-full justify-between"
            >
               <div className="flex flex-row gap-2 items-center">
                  {!isSm && (
                     <>
                        {type === "register" && (
                           <>
                              <UserPlusIcon className="!h-6 !w-6 fill-normal" />
                           </>
                        )}
                        {type === "login" && (
                           <>
                              <UserIcon className="!h-6 !w-6 fill-normal" />
                           </>
                        )}
                        {type === "createLibrary" && (
                           <>
                              <PlusIcon className="!h-6 !w-6 fill-normal" />
                           </>
                        )}
                     </>
                  )}
                  {uppercaseifySentences(text)}
               </div>
               {!isSm && (
                  <>
                     <ChevronRightIcon className="!h-6 !w-6 fill-normal" />
                  </>
               )}
            </Button>
         </div>
      </>
   );
};

export default LandingHomeAction;
