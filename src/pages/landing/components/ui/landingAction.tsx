import React from "react";

import { Button } from "@/shared/components/ui";
import { EditIcon } from "@/shared/components/icons";
import { uppercaseify } from "@/shared/lib";
import { LandingPageViews } from "../../types";
import { useViewSwitcher } from "@/shared/hooks";
import { useMediaQuery } from "@/shared/hooks";

type LandingActionProps = { type: "login" | "register"; view?: LandingPageViews };

const LandingAction = ({ type, view }: LandingActionProps): React.JSX.Element => {
   const { navigate } = useViewSwitcher();
   const isSm = useMediaQuery({ mediaQuery: "(min-width: 640px)" });

   const actionConfig: Record<
      LandingActionProps["type"],
      { text: string; variant: "base" | "accent"; title: string; subTitle: string }
   > = {
      register: {
         text: "register",
         variant: "accent",
         title: "Create Your Account",
         subTitle:
            "Sign up to unlock premium features, and sync your library across devices.",
      },
      login: {
         text: "login",
         variant: "base",
         title: "Welcome Back",
         subTitle: "Log in to access your saved libraries and preferences.",
      },
   };

   const { text, variant, title, subTitle } = actionConfig[type];

   return (
      <>
         <div
            className="w-full select-none flex flex-row sm:flex-row py-2 justify-between
               !border-modifier-border-color border-solid border-b-[1px]"
         >
            {isSm && (
               <>
                  <div className="flex flex-col">
                     <header className="text-fs-lg font-weight-lg">{title}</header>
                     <p className="text-muted text-fs-md font-weight-md">{subTitle}</p>
                  </div>
               </>
            )}
            <Button
               size={isSm ? "md" : "lg"}
               variant={isSm ? variant : "ghost"}
               onClick={() => navigate(view)}
               className="sm:!justify-center flex items-center w-full justify-between sm:w-28 sm:h-8
                  sm:bg-modifier-gradient-1"
            >
               <div className="flex flex-row gap-2 items-center">
                  {!isSm && (
                     <>
                        {type === "register" && (
                           <>
                              <EditIcon className="!h-6 !w-6 fill-normal" />
                           </>
                        )}
                        {type === "login" && (
                           <>
                              <EditIcon className="!h-6 !w-6 fill-normal" />
                           </>
                        )}
                     </>
                  )}

                  {uppercaseify(text)}
               </div>

               {!isSm && <>{">"}</>}
            </Button>
         </div>
      </>
   );
};

export default LandingAction;
