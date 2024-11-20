import React from "react";
import Button from "../../shared/components/ui/button";
import { uppercaseify } from "../../shared/lib/utils";

type LandingActionProps = { type: "login" | "register"; href: string };

export default function LandingAction({ type, href }: LandingActionProps): JSX.Element {
   const buttonTexts: Record<LandingActionProps["type"], string> = {
      register: "register for free",
      login: "login",
   };
   const buttonVariants: Record<LandingActionProps["type"], "ghost" | "accent"> = {
      register: "accent",
      login: "ghost",
   };
   const buttonIcon: Record<LandingActionProps["type"], "bx-edit" | "bx-door-open"> = {
      register: "bx-edit",
      login: "bx-door-open",
   };

   const variant: "accent" | "ghost" = buttonVariants[type];
   const text: string = buttonTexts[type];
   const icon: "bx-edit" | "bx-door-open" = buttonIcon[type];

   return (
      <>
         <div className="cursor-pointer select-none">
            <Button variant={variant} href={href} className="items-center gap-2">
               <i className={`bx ${icon} text-fs-lg`}></i>
               {uppercaseify(text)}
            </Button>
         </div>
      </>
   );
}
