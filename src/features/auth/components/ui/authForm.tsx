import React from "react";
import AuthFormLayout from "../layouts/authFormLayout";
import { AuthFormTypes } from "../../lib/types";

type AuthFormProps = { type: AuthFormTypes };

export default function AuthForm({ type }: AuthFormProps) {
   return (
      <>
         <form id={"auth-form"}>
            <div className="flex flex-col"></div>
         </form>
      </>
   );
}
