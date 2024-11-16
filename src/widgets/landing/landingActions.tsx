import React from "react";
import { Link } from "react-router-dom";
import { uppercaseify } from "../../shared/lib/utils";
import Button from "../../shared/components/ui/button";
import Divider from "../../shared/components/ui/divider";

export default function LandingActions(): React.JSX.Element {
   return (
      <>
         <div className="flex justify-end z-c-layer-content">
            <div className="flex flex-col w-full">
               <div className="grid grid-cols-1 gap-2 sm:gap-0">
                  <LandingAction href="/register" type="register" />
                  <Divider rootClassName="my-2 hidden sm:block" />
                  <LandingAction href="/login" type="login" />
               </div>
            </div>
         </div>
      </>
   );
}

type LandingActionProps = { type: "login" | "register"; href: string };

function LandingAction({ type, href }: LandingActionProps): React.JSX.Element {
   const buttonTexts: Record<LandingActionProps["type"], string> = {
      register: "register for free",
      login: "login",
   };
   const buttonVariants: Record<LandingActionProps["type"], "default" | "ghost"> = {
      register: "default",
      login: "ghost",
   };

   const variant: "default" | "ghost" = buttonVariants[type];
   const text: string = buttonTexts[type];

   return (
      <>
         <div className="select-none cursor-pointer">
            <Button variant={variant} href={href}>
               {uppercaseify(text)}
            </Button>
         </div>
      </>
   );
}
