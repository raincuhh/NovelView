import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthInputType } from "../../lib/types";
import { uppercaseify } from "../../../../shared/lib/utils";

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
      "Error invalid username"
   );
   const [password_field_type, set_password_field_type] =
      useState("password");

   const placeholders = {
      email: "user@example.com",
      password: "password",
      username: "john_doe",
   };

   const handle_change = (v: string) => {
      set_value(v);
      console.log(v);
   };

   const is_password_login_input = () => {
      return (
         input_type === "password" && form_type === "login"
      );
   };

   return (
      <>
         <div className="flex flex-col">
            <div className="relative flex flex-col">
               <div className="flex flex-row space-x-2 justify-between mb-2">
                  <label
                     htmlFor={`${form_type}_${label}`}
                     className="font-primary text-fs-xs text-text-muted"
                     style={{ fontWeight: 500 }}
                  >
                     {uppercaseify(label)}
                  </label>
                  {is_password_login_input() && (
                     <div>
                        <Link to="/login/forgot-password">
                           <p
                              className="font-primary text-text-muted text-fs-xs hover:text-text-normal duration-100 transition-colors"
                              style={{ fontWeight: 500 }}
                           >
                              Forgot password?
                           </p>
                        </Link>
                     </div>
                  )}
               </div>
               <div className="flex flex-col">
                  <div>
                     <div className="relative">
                        <input
                           type={input_type}
                           name={`${form_type}_${label}`}
                           id={`${form_type}_${label}`}
                           placeholder={
                              placeholders[input_type]
                           }
                           aria-placeholder={
                              placeholders[input_type]
                           }
                           autoComplete={input_type}
                           aria-autocomplete="none"
                           onChange={(e) =>
                              handle_change(e.target.value)
                           }
                           className="w-full border-solid border-[1px] p-2 bg-input-bg rounded-[4px] border-border-secondary placeholder:text-text-faint text-text-primary focus:outline-none"
                        />
                        <div className="flex">
                           <div className="absolute top-[50%] translate-x-[0] translate-y-[-50%] right-0  flex flex-row items-center">
                              {error_message && (
                                 <i
                                    className={`bx bx-error-circle text-text-error pl-2 ${
                                       is_password_login_input()
                                          ? "pr-2"
                                          : "pr-[10px]"
                                    } text-fs-md`}
                                 ></i>
                              )}

                              {is_password_login_input() && (
                                 <>
                                    <div className="mr-[10px] w-8 h-7 bg-background-primary-alt border-solid border-border-secondary hover:border-border-tertiary border-[1px] rounded-[4px]">
                                       <div className="h-full w-full flex justify-center items-center">
                                          t
                                       </div>
                                    </div>
                                 </>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="text-text-error text-sm">
                     {error_message && (
                        <p className="mt-2">
                           {error_message}
                        </p>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
