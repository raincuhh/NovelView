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
      <div className="flex flex-col w-full mb-2">
         <div className="relative flex flex-col">
            <header className="flex flex-row justify-between mb-2 font-family-primary">
               <div>
                  <label htmlFor={inputId}>{uppercaseify(label)}</label>
               </div>
               {isForgotPasswordIncluded && (
                  <>
                     <div className="cursor-pointer">
                        <Link to="/forgot-password">
                           <span className="transition-colors duration-100 ease-in-out dark:text-text-faint dark:hover:text-text-muted">
                              Forgot password?
                           </span>
                        </Link>
                     </div>
                  </>
               )}
            </header>
         </div>
         <div className="flex flex-col min-w-full">
            <div>
               <div className="relative">
                  <Input
                     variant={"base"}
                     name={inputId}
                     id={inputId}
                     placeholder={placeholder}
                     aria-placeholder={placeholder}
                     autoComplete={inputType}
                     onChange={(e) => validateInput(e.target.value)}
                     className={`w-full ${error ? "" : ""}`}
                  />
                  <div className="flex">
                     <div className="">{error}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
