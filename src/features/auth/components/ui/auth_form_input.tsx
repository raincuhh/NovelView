import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthInputType } from "../../lib/types";

type AuthFormInputProps = {
   form_type: "login" | "register";
   input_type: AuthInputType;
   label: string;
   callback?: (event: string) => void;
};

export default function AuthFormInput({
   form_type,
   input_type,
   label,
   callback,
}: AuthFormInputProps): JSX.Element {
   const [value, set_value] = useState("");
   const [error_message, set_error_message] = useState(
      "well well well"
   );

   const placeholders = {
      email: "user@example.com",
      password: "password",
      username: "john_doe",
   };

   return (
      <>
         <div className="flex flex-col">
            <div className="relative flex flex-col">
               <div className="flex flex-row space-x-2 justify-between">
                  <label htmlFor={label}>{label}</label>
                  <div className="">
                     {input_type === "password" && (
                        <div>forgot password?</div>
                     )}
                  </div>
               </div>
               <div className="flex flex-col">
                  <div>
                     <div className="relative">
                        <input
                           type={input_type}
                           name={label}
                           id={form_type + "_" + input_type}
                           placeholder={
                              placeholders[input_type]
                           }
                           aria-placeholder={
                              placeholders[input_type]
                           }
                           autoComplete={input_type}
                           aria-autocomplete="none"
                        />
                        <div>
                           {error_message && (
                              <div className="absolute top-0 right-0 pr-1 flex items-center">
                                 <i className="bx bx-error-circle text-text-warning"></i>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
                  <p>
                     {error_message && (
                        <p className="text-text-warning text-sm mt-1">
                           {error_message}
                        </p>
                     )}
                  </p>
               </div>
            </div>
         </div>
      </>
   );
}
