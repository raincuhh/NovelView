import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthInputType } from "../../lib/types";
import { uppercaseify } from "../../../../shared/lib/utils";
import FormInput from "../../../../shared/components/forms/form_input";

type AuthFormInputProps = {
   form_type: "login" | "register";
   input_type: AuthInputType;
   label: string;
   value: string;
   error_message: string;
   on_input_change: (value: string, error: string) => void;
};

export default function AuthFormInput({
   form_type,
   input_type,
   label,
   error_message,
   on_input_change,
}: AuthFormInputProps): JSX.Element {
   const [password_field_type, set_password_field_type] =
      useState("password");

   const toggle_password_field_type = () => {
      set_password_field_type((prev) =>
         prev === "password" ? "text" : "password"
      );
   };

   const placeholders = {
      email: "user@example.com",
      password: "password",
      username: "cooldog123",
   };

   const validate_input = (value: string) => {
      let error: string = "";
      const empty_value = value.length <= 0;

      switch (input_type) {
         case "email":
            const email_regex: RegExp =
               /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (!empty_value && !email_regex.test(value)) {
               error = "Invalid email format";
            }
            break;
         case "password":
            const minimum_one_uppercase_regex: RegExp =
               /[A-Z]/;
            const minimum_one_special_regex: RegExp =
               /[!@#$%^&*(),.?":{}|<>]/;

            if (!empty_value && value.length < 8) {
               error =
                  "Password must be atleast 8 characters long";
            } else if (
               !empty_value &&
               !minimum_one_uppercase_regex.test(value)
            ) {
               error =
                  "Password must contain atleast one uppercase letter";
            } else if (
               !empty_value &&
               !minimum_one_special_regex.test(value)
            ) {
               error =
                  "Password must contain atleast one special letter";
            }
            break;
         default:
            break;
      }

      on_input_change(value, error);
   };

   const handle_change = (
      value: React.ChangeEvent<HTMLInputElement>
   ) => {
      const new_val = value.target.value;
      if (form_type === "login") return;
      validate_input(new_val);
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
                        <Link to="/login/forgt-password">
                           <p
                              className="font-primary text-text-faint text-fs-xs hover:text-text-muted transition-colors duration-100 ease-in-out"
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
                        <FormInput
                           type={
                              input_type !== "password"
                                 ? input_type
                                 : password_field_type
                           }
                           name={`${form_type}_${label}`}
                           id={`${form_type}_${label}`}
                           placeholder={
                              placeholders[input_type]
                           }
                           aria_placeholder={
                              placeholders[input_type]
                           }
                           auto_complete={input_type}
                           on_change_callback={
                              handle_change
                           }
                           css={
                              error_message &&
                              "!bg-destructive-200 !border-destructive-300 !text-text-error"
                           }
                        />
                        <div className="flex">
                           <div
                              className={`absolute top-[50%] translate-x-[0] translate-y-[-50%] bg-background-primary-alt ${
                                 error_message &&
                                 "bg-destructive-200"
                              } right-0  flex flex-row items-center mr-[2px]`}
                           >
                              {error_message && (
                                 <i
                                    className={`bx bx-error-circle text-text-error pl-2 ${
                                       is_password_login_input()
                                          ? "pr-[8px]"
                                          : "pr-2"
                                    } text-fs-md`}
                                 ></i>
                              )}
                              {input_type ===
                                 "password" && (
                                 <div className="">
                                    <div
                                       onClick={() =>
                                          toggle_password_field_type()
                                       }
                                       className="mr-2 w-8 h-7 bg-background-primary-alt hover:bg-background-secondary border-solid border-border-secondary hover:border-border-tertiary border-[1px] rounded-[4px] transition-colors duration-100 ease-in-out"
                                    >
                                       <div
                                          className="h-full w-full flex justify-center items-center text-fs-xs font-primary pointer-events-none cursor-pointer select-none"
                                          style={{
                                             fontWeight: 500,
                                          }}
                                       >
                                          w
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div
                     className="text-text-error font-primary"
                     style={{ fontWeight: 500 }}
                  >
                     {error_message && (
                        <p className="mt-2 text-fs-xs break-words transition-all">
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
