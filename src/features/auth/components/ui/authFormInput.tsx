import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uppercaseify } from "../../../../shared/lib/utils";
import Input from "../../../../shared/components/ui/input";
import { AuthInputTypes, AuthModeTypes } from "../../lib/types";
import useValidateInput from "../../hooks/useValidateInput";

type AuthFormInputProps = {
   formModeType: AuthModeTypes;
   inputType: AuthInputTypes;
   label: string;
   value: string;
   errorMessage: string;
   onInputChange: (value: string, error: string) => void;
};

export default function AuthFormInput({
   formModeType,
   inputType,
   label,
   value,
   errorMessage,
   onInputChange,
}: AuthFormInputProps): JSX.Element {
   const { validateInput, error } = useValidateInput({ inputType, onInputChange });
   const isForgotPasswordIncluded = formModeType === "login" && inputType === "password";
   const inputId = `${formModeType}-${inputType}`;

   const placeholders = {
      email: "user@example.com",
      password: "password",
      username: "username",
   };

   const placeholder = placeholders[inputType];

   useEffect(() => {
      if (value) validateInput(value);
   }, [value]);

   return (
      <div className="mb-2 flex w-full flex-col">
         <div className="relative flex flex-col">
            <header className="mb-2 flex flex-row justify-between font-family-primary">
               <div>
                  <label htmlFor={inputId}>{uppercaseify(label)}</label>
               </div>
               {isForgotPasswordIncluded && (
                  <>
                     <div className="cursor-pointer">
                        <Link to="/forgot-password">
                           <span className="dark:text-text-faint dark:hover:text-text-muted transition-colors duration-100 ease-in-out">
                              Forgot password?
                           </span>
                        </Link>
                     </div>
                  </>
               )}
            </header>
         </div>
         <div className="flex min-w-full flex-col">
            <div>
               <div className="relative">
                  <Input
                     variant={"textDefault"}
                     name={inputId}
                     id={inputId}
                     placeholder={placeholder}
                     aria-placeholder={placeholder}
                     autoComplete={inputType}
                     onChange={(e) => {
                        validateInput(e.target.value);
                     }}
                     className={"w-full"}
                  />
                  <div className="flex">
                     <div className=""></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
