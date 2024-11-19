import React, { useState } from "react";

type UseValidateInputProps = {
   inputType: any;
   onInputChange: (value: string, error: string) => void;
};

const useValidateInput = ({ inputType, onInputChange }: UseValidateInputProps) => {
   const [error, setError] = useState<string>("");

   const validateInput = (value: string) => {
      let validationError: string = "";
      const emptyValue: boolean = value.length <= 0;

      switch (inputType) {
         case "email":
            const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emptyValue && !emailRegex.test(value)) {
               validationError = "Invalid email format";
            }
            break;
         case "password":
            const minimumOneUppercaseRegex = /[A-Z]/;
            const minimumOneSpecialRegex = /[!@#$%^&*(),.?":{}|<>]/;

            if (!emptyValue && value.length < 8) {
               validationError = "Password must be at least 8 characters long";
            } else if (!emptyValue && !minimumOneUppercaseRegex.test(value)) {
               validationError = "Password must contain at least one uppercase letter";
            } else if (!emptyValue && !minimumOneSpecialRegex.test(value)) {
               validationError = "Password must contain at least one special character";
            }
            break;
         default:
            break;
      }

      setError(validationError);
      onInputChange(value, validationError);
   };

   return { validateInput, error };
};

export default useValidateInput;
