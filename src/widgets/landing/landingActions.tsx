import React from "react";
import { Link } from "react-router-dom";
import { uppercaseify } from "../../shared/lib/utils";
import Button from "../../shared/components/ui/button";

export default function LandingActions(): JSX.Element {
   return (
      <>
         <div className="flex justify-end z-layer-content">
            <div className="flex flex-col w-full">
               <div className="grid grid-cols-1 gap-2 sm:gap-2">
                  <LandingAction href="/register" type="register" />
                  <LandingAction href="/login" type="login" />
               </div>
            </div>
         </div>
      </>
   );
}

type LandingActionProps = { type: "login" | "register"; href: string };

function LandingAction({ type, href }: LandingActionProps): JSX.Element {
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
