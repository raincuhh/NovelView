import React from "react";
import { AuthActions } from "@/features/auth";

type AuthOptionalHeaderProps = { type: AuthActions };

const AuthOptionalHeader = ({ type }: AuthOptionalHeaderProps): React.JSX.Element => {
   const actionConfig: Record<AuthActions, { title: string; desc: string }> = {
      register: {
         title: "Create an Account",
         desc: "Sign up for NovelView to unlock premium features and sync your library.",
      },
      login: {
         title: "Login to Your Account",
         desc: "Access your saved libraries and enjoy seamless reading across devices.",
      },
      forgotPassword: {
         title: "Forgot Your Password?",
         desc: "Enter your email to receive instructions for resetting your password.",
      },
      forgotEmail: {
         title: "Trouble Finding Your Email?",
         desc: "We'll help you locate the email associated with your NovelView account.",
      },
      resetPassword: {
         title: "Reset Your Password",
         desc: "Create a new password to regain access to your NovelView account.",
      },
      verifyEmail: {
         title: "Verify Your Email Address",
         desc: "Check your inbox for a verification link to activate your account.",
      },
   };

   const { title, desc } = actionConfig[type];

   return (
      <>
         <div className="flex flex-col">
            <header className="text-fs-2xl sm:text-fs-lg font-weight-lg">{title}</header>
            <p className="text-muted text-fs-md font-weight-md">{desc}</p>
         </div>
      </>
   );
};

export default AuthOptionalHeader;
