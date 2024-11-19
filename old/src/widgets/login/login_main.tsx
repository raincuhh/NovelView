import { isTauri } from "../../shared/lib/tauri_utils";

import AuthFormHeader from "../../features/auth/components/ui/auth_form_header";
import AuthForm from "../../features/auth/components/ui/auth_form";
import AuthFooter from "../../features/auth/components/ui/auth_agreement_footer";
import AuthDivider from "../../features/auth/components/ui/auth_divider";
import AuthFormSwitcher from "../../features/auth/components/ui/auth_form_switcher";

export default function LoginMain(): JSX.Element {
   return (
      <>
         <main
            className={`flex h-full w-full flex-col items-center justify-center overflow-y-scroll rounded-r-md lg:w-[65%] ${
               isTauri ? "pt-[30px]" : ""
            }`}
         >
            <div className="min-w-500:w-[380px] min-w-1150:w-[420px] c-min-h-668:mt-[100px] flex h-full w-[320px] min-w-[320px] flex-col px-4 py-6">
               <AuthFormHeader label="Welcome back" desc="Login to your account" />
               <div className="mt-4 flex flex-col">
                  {/* <AuthDivider /> */}
                  <AuthForm formId="login-form" formType="login" formMethod="POST" />
               </div>
               <AuthFormSwitcher
                  desc="Don't have an account?"
                  link_path="/register"
                  link_label="Register Here"
               />
               <AuthFooter />
            </div>
         </main>
      </>
   );
}
