import React, { useState, useEffect } from "react";
import { isTauri } from "@tauri-apps/api/core";
import { RenderList } from "@/shared/components/utils";
import { uppercaseify } from "@/shared/lib";
import { Button, Checkbox } from "@/shared/components/ui";
import AuthFormInput from "./authFormInput";
import { AuthField, AuthActions } from "../../types";

type AuthFormProps = { type: AuthActions };

const AuthForm = ({ type }: AuthFormProps): React.JSX.Element => {
   const formInputs: AuthField[] =
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
         <div className={`${isTauri() ? "mt-10" : ""}`}>
            <div className="flex flex-col items-center justify-center w-full">
               <div className="flex flex-col items-center justify-center w-full gap-1">
                  <RenderList
                     data={formInputs}
                     render={(inputType: AuthField, i: number) => (
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
            </div>
         </div>
      </>
   );
};

export default AuthForm;
