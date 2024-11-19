import React, { useState } from "react";
import AuthFormLayout from "../layouts/authFormLayout";
import { AuthModeTypes } from "../../lib/types";

type AuthFormProps = { type: AuthModeTypes };

export default function AuthForm({ type }: AuthFormProps) {
   const [formData, setFormData] = useState<{
      [key: string]: string;
   }>({});
   const [formErrors, setFormErrors] = useState<{
      [key: string]: string;
   }>({});

   // const HandleInputChange = (field: string, value: string, error: string) => {
   //    set_form_data((prev: any) => ({
   //       ...prev,
   //       [field]: value,
   //    }));
   //    set_form_errors((prev: any) => ({
   //       ...prev,
   //       [field]: error,
   //    }));
   // };

   return (
      <>
         <form id={"auth-form"}>
            <div className="flex flex-col"></div>
         </form>
      </>
   );
}
