import React, { useState, useEffect } from "react";
import AuthFormLayout from "../layouts/authFormLayout";
import { AuthInputTypes, AuthModeTypes } from "../../lib/types";
import RenderList from "../../../../shared/components/utils/renderList";
import Input from "../../../../shared/components/ui/input";
import AuthFormInput from "./authFormInput";

type AuthFormProps = { type: AuthModeTypes };

export default function AuthForm({ type }: AuthFormProps): React.JSX.Element {
   const formInputs: AuthInputTypes[] =
      type === "register" ? ["username", "email", "password"] : ["username", "password"];

   const [formData, setFormData] = useState<{
      [key: string]: string;
   }>({});
   const [formErrors, setFormErrors] = useState<{
      [key: string]: string;
   }>({});

   useEffect(() => {
      console.log(formErrors);
      console.log(formData);
   }, [formErrors, formData]);

   const HandleInputChange = (field: string, value: string, error: string) => {
      setFormData((prev: any) => ({
         ...prev,
         [field]: value,
      }));
      setFormErrors((prev: any) => ({
         ...prev,
         [field]: error,
      }));
   };

   return (
      <>
         <AuthFormLayout id="auth-form">
            <RenderList
               data={formInputs}
               render={(inputType: AuthInputTypes, i: number) => (
                  <AuthFormInput
                     key={i}
                     formModeType={type}
                     inputType={inputType}
                     label={inputType}
                     value={formData[inputType] || ""}
                     errorMessage={formErrors[inputType] || ""}
                     onInputChange={(value: string, error: string) => {
                        HandleInputChange(inputType, value, error);
                     }}
                  />
               )}
            />
         </AuthFormLayout>
      </>
   );
}
