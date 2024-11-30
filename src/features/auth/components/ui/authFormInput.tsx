import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uppercaseify } from "@/shared/lib";
import { Input } from "@/shared/components/ui";
import { AuthField, AuthActions } from "../../types";
import { useValidateInput } from "../../hooks";
import { EyeOpenIcon, EyeSlashIcon } from "@/shared/components/icons";

type AuthFormInputProps = {
   authActionType: AuthActions;
   authFieldType: AuthField;
   label: string;
   value: string;
   errorMessage: string;
   onInputChange: (value: string, error: string) => void;
};

const AuthFormInput = ({
   authActionType,
   authFieldType,
   label,
   value,
   errorMessage,
   onInputChange,
}: AuthFormInputProps): React.JSX.Element => {
   const { validateInput, error } = useValidateInput({ authFieldType, onInputChange });
   const isForgotPasswordIncluded =
      authActionType === "login" && authFieldType === "password";
   const inputId = `${authActionType}-${authFieldType}`;

   const placeholders: Record<AuthField, string> = {
      email: "enter email...",
      password: "enter password...",
      username: "enter username...",
      confirmPassword: "confirm password...",
      verificationCode: "enter verification code...",
   };

   const placeholder = placeholders[authFieldType];

   useEffect(() => {
      if (value) validateInput(value);
   }, [value]);

   return (
      <div className="flex flex-col w-full mb-2">
         {/* <div className="relative flex flex-col">
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
         </div> */}
         <div className="flex flex-col items-center w-full min-w-full">
            <div className="flex flex-col items-center justify-center w-full">
               <div className="relative items-center justify-center w-[99.5%]">
                  <Input
                     variant={"base"}
                     name={inputId}
                     id={inputId}
                     placeholder={placeholder}
                     aria-placeholder={placeholder}
                     autoComplete={authFieldType}
                     onChange={(e) => validateInput(e.target.value)}
                     className={`w-full ${error ? "" : ""}`}
                  />
                  <div
                     className="absolute top-0 right-0 flex items-center h-full cursor-pointer mr-[2px]
                        pointer-events-none"
                  >
                     <div
                        className="p-2 dark:bg-background-modifier-primary-form-field
                           dark:sm:bg-background-modifier-secondary-form-field"
                        onClick={(e) => {
                           e.stopPropagation();
                        }}
                     >
                        <div>
                           {authFieldType === "password" && (
                              <>
                                 <EyeOpenIcon className="!fill-muted" />
                              </>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
               {error && (
                  <>
                     <div className="flex mt-2">
                        <div className="text-text-error">{error}</div>
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default AuthFormInput;
