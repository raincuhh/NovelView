import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { uppercaseify } from "@/shared/lib";
import { Input } from "@/shared/components/ui";
import { AuthField, AuthActions } from "../../types";
import { useValidateInput } from "../../hooks";

const authFieldConfig: Record<AuthField, { placeholder: string; fieldTitle: string }> = {
   username: {
      placeholder: "enter username...",
      fieldTitle: "Username",
   },
   password: {
      placeholder: "enter password...",
      fieldTitle: "Password",
   },
   email: {
      placeholder: "enter email...",
      fieldTitle: "Email",
   },
   confirmPassword: {
      placeholder: "confirm password...",
      fieldTitle: "Confirm Password",
   },
   verificationCode: {
      placeholder: "enter verification code...",
      fieldTitle: "Verification Code",
   },
};

type AuthFormInputProps = {
   authActionType: AuthActions;
   inputType: AuthField;
   value: string;
   errorMessage: string;
   onInputChange: (value: string, error: string) => void;
};

const AuthFormInput = ({
   authActionType,
   inputType,
   value,
   errorMessage,
   onInputChange,
}: AuthFormInputProps): React.JSX.Element => {
   const { validateInput, error } = useValidateInput({ inputType, onInputChange });
   const forgotPasswordIncluded = authActionType === "login" && inputType === "password";
   const { placeholder, fieldTitle } = authFieldConfig[inputType];
   const inputId = `${authActionType}_${inputType}`;

   useEffect(() => {
      if (value) validateInput(value);
   }, [value]);

   return (
      <>
         <label
            htmlFor={inputId}
            className="flex-col flex sm:flex-row justify-between w-full"
         >
            <header className="flex flex-row gap-2 items-end">
               <div className="text-fs-lg font-weight-lg">{fieldTitle}</div>
               {forgotPasswordIncluded && (
                  <>
                     <Link
                        to={"/forgot-password"}
                        className="text-fs-md font-weight-lg text-muted"
                     >
                        forgot password?
                     </Link>
                  </>
               )}
            </header>
            <div>testtt</div>
         </label>
      </>
      // <div className="flex flex-col w-full mb-2">
      // {/* <div className="relative flex flex-col">
      //    <header className="flex flex-row justify-between mb-2 font-family-primary">
      //       <div>
      //          <label htmlFor={inputId}>{uppercaseify(label)}</label>
      //       </div>
      //       {isForgotPasswordIncluded && (
      //          <>
      //             <div className="cursor-pointer">
      //                <Link to="/forgot-password">
      //                   <span className="transition-colors duration-100 ease-in-out dark:text-text-faint dark:hover:text-text-muted">
      //                      Forgot password?
      //                   </span>
      //                </Link>
      //             </div>
      //          </>
      //       )}
      //    </header>
      // </div> */}
      //    {/* <div className="flex flex-col items-center w-full min-w-full">
      //       <div className="flex flex-col items-center justify-center w-full">
      //          <div className="relative items-center justify-center w-[99.5%]">
      //             <Input
      //                variant={"base"}
      //                name={inputId}
      //                id={inputId}
      //                placeholder={placeholder}
      //                aria-placeholder={placeholder}
      //                autoComplete={inputType}
      //                onChange={(e: any) => validateInput(e.target.value)}
      //                className={`w-full ${error ? "" : ""}`}
      //             />
      //             <div className="absolute top-0 right-0 flex items-center h-full cursor-text mr-[2px] pointer-events-none">
      //                <div
      //                   className="p-2 dark:bg-background-modifier-primary-form-field
      //                      dark:sm:bg-background-modifier-secondary-form-field"
      //                   onClick={(e) => {
      //                      e.stopPropagation();
      //                   }}
      //                >
      //                   <div>
      //                      {inputType === "password" && (
      //                         <>
      //                            <EyeOpenIcon className="!fill-muted" />
      //                         </>
      //                      )}
      //                   </div>
      //                </div>
      //             </div>
      //          </div>
      //          {error && (
      //             <>
      //                <div className="flex mt-2">
      //                   <div className="text-text-error">{error}</div>
      //                </div>
      //             </>
      //          )}
      //       </div>
      //    </div>
      // </div> */}
   );
};

export default AuthFormInput;
