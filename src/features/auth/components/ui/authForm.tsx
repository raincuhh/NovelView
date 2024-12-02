import React, { useState, useEffect } from "react";
import { isTauri } from "@tauri-apps/api/core";

import { RenderList } from "@/shared/components/utils";
import { uppercaseify } from "@/shared/lib";
import { Button, Checkbox } from "@/shared/components/ui";
import AuthFormInput from "./authFormInput";
import { AuthField, AuthActions } from "../../types";
import { useEnvironment } from "@/shared/hooks";

const actionConfig: Record<
   AuthActions,
   { text: string; variant: string; title: string; desc: string }
> = {
   register: {
      text: "Sign Up",
      variant: "base",
      title: "Create an Account",
      desc: "Sign up to unlock premium features and syncing.",
   },
   login: {
      text: "Log In",
      variant: "base",
      title: "Welcome Back",
      desc: "Log in to access your synced libraries.",
   },
   forgotPassword: {
      text: "Reset Password",
      variant: "base",
      title: "Forgot Password",
      desc: "Enter your email to reset your password.",
   },
   forgotEmail: {
      text: "Recover Email",
      variant: "base",
      title: "Forgot Email",
      desc: "Enter your username to recover your email address.",
   },
   resetPassword: {
      text: "Set New Password",
      variant: "base",
      title: "Reset Password",
      desc: "Set a new password for your account.",
   },
   verifyEmail: {
      text: "Verify Email",
      variant: "base",
      title: "Verify Your Email",
      desc: "Enter the verification code sent to your email.",
   },
};

type AuthFormProps = { type: AuthActions };

const AuthForm = ({ type }: AuthFormProps): React.JSX.Element => {
   const [formData, setFormData] = useState<{
      [key: string]: string;
   }>({});
   const [formErrors, setFormErrors] = useState<{
      [key: string]: string;
   }>({});
   const { isMobile } = useEnvironment();

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

   const getFieldsForType = (action: AuthActions): AuthField[] => {
      switch (action) {
         case "register":
            return ["username", "email", "password"];
         case "login":
            return ["username", "password"];
         case "forgotPassword":
            return ["email"];
         case "resetPassword":
            return ["password", "confirmPassword", "verificationCode"];
         case "verifyEmail":
            return ["verificationCode"];
         default:
            return [];
      }
   };

   const formInputs = getFieldsForType(type);
   const { text, variant, title, desc } = actionConfig[type];

   return (
      <>
         <div
            className={`w-full select-none flex flex-col sm:py-0 border-modifier-border-color border-solid
               sm:border-t-[1px]`}
         >
            <div className="flex flex-col w-full">
               <RenderList
                  data={formInputs}
                  render={(inputType: AuthField, i: number) => (
                     <div
                        key={i}
                        className="flex flex-row w-full py-2 border-modifier-border-color sm:border-b-[1px] border-solid"
                     >
                        <AuthFormInput
                           authActionType={type}
                           inputType={inputType}
                           value={formData[inputType] || ""}
                           errorMessage={formErrors[inputType] || ""}
                           onInputChange={(value: string, error: string) => {
                              HandleInputChange(inputType, value, error);
                           }}
                        />
                     </div>
                  )}
               />
            </div>
            <div className="flex flex-col mt-2">
               <div className="relative"></div>
               <div className="flex items-center justify-center sm:justify-end w-full">
                  <Button
                     size={isMobile ? "lg" : "desktop"}
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
