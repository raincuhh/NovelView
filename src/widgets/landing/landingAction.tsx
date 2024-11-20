import React from "react";
import Button from "../../shared/components/ui/button";
import EditIcon from "../../shared/components/ui/icons/editIcon";
import { uppercaseify } from "../../shared/lib/utils";

type LandingActionProps = { type: "login" | "register"; href: string };

export default function LandingAction({ type, href }: LandingActionProps): JSX.Element {
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
         <div className="cursor-pointer select-none">
            <Button
               variant={variant}
               href={href}
               className="items-center gap-2 text-text-normal"
            >
               {type === "register" && (
                  <>
                     <EditIcon className="h-6 fill-text-normal" />
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
