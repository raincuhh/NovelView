import React from "react";
// import Button from "../../shared/components/ui/button";
// import EditIcon from "../../shared/components/ui/icons/editIcon";
// import { uppercaseify } from "../../shared/lib/utils";
// import { LandingPageViews } from "./landingPageContent";
// import { useViewSwitcher } from "../../shared/hooks/useViewSwitcher";

type LandingActionProps = { type: "login" | "register"; view: LandingPageViews };

export default function LandingAction({ type, view }: LandingActionProps): JSX.Element {
   const { navigate } = useViewSwitcher();

   const buttonTexts: Record<LandingActionProps["type"], string> = {
      register: "create an account",
      login: "login",
   };
   const buttonVariants: Record<LandingActionProps["type"], "ghost" | "accent"> = {
      register: "accent",
      login: "ghost",
   };

   const variant: "accent" | "ghost" = buttonVariants[type];
   const text: string = buttonTexts[type];

   return (
      <>
         <div className="w-full cursor-pointer select-none">
            <Button
               variant={variant}
               onClick={() => navigate(view)}
               className="items-center w-full gap-2 text-text-normal"
            >
               {type === "register" && (
                  <>
                     <EditIcon className="h-6 fill-normal" />
                  </>
               )}
               {type === "login" && (
                  <>
                     <i className="bx bx-right-arrow-circle text-fs-lg"></i>
                  </>
               )}
               {uppercaseify(text)}
            </Button>
         </div>
      </>
   );
}
