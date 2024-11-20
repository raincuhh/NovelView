import React, { useState, useEffect } from "react";
import AuthFormLayout from "../layouts/authFormLayout";
import { AuthInputTypes, AuthModeTypes } from "../../lib/types";
import RenderList from "../../../../shared/components/utils/renderList";
import Checkbox from "../../../../shared/components/ui/checkbox";
import AuthFormInput from "./authFormInput";
import Button from "../../../../shared/components/ui/button";
import { uppercaseify } from "../../../../shared/lib/utils";

type AuthFormProps = { type: AuthModeTypes };

export default function AuthForm({ type }: AuthFormProps): JSX.Element {
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
            <div className="flex flex-col w-full gap-2">
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
            </div>
            <div className="items-end w-full">
               {type === "login" && (
                  <>
                     <Checkbox text="Remember me?" />
                  </>
               )}
            </div>
            <div className="relative"></div>
            <div className="flex items-center justify-center w-full mt-8">
               <Button
                  size={"md"}
                  variant={"accent"}
                  text={uppercaseify(type)}
                  className="w-full"
               />
            </div>
         </AuthFormLayout>
      </>
   );
}
