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
}: AuthFormInputProps): React.JSX.Element {
   //  const { validateInput, error } = useValidateInput({ inputType, onInputChange });

   const isForgotPasswordIncluded = formModeType === "login" && inputType === "password";

   const inputUid = `${formModeType}-${inputType}`;

   useEffect(() => {
      // if (value) validateInput(value);
   }, [value]);

   return (
      <div className="flex flex-col">
         <div className="relative flex flex-col">
            <header className="mb-2 flex flex-row justify-between font-family-primary">
               <div>
                  <label htmlFor={inputUid}>{uppercaseify(label)}</label>
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
         <div className="flex flex-col">
            <div>
               <div className="relative">
                  <Input variant={"textDefault"} className="w-full" />
               </div>
            </div>
         </div>
      </div>
   );
}
