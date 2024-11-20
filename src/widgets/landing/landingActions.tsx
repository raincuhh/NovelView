import React from "react";
import { Link } from "react-router-dom";
import { uppercaseify } from "../../shared/lib/utils";
import Button from "../../shared/components/ui/button";
import LandingAction from "./landingAction";

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
