import { is_tauri } from "../../shared/lib/tauri_utils";

import AuthFormHeader from "../../features/auth/components/ui/auth_form_header";
import AuthForm from "../../features/auth/components/ui/auth_form";
import AuthAgreementFooter from "../../features/auth/components/ui/auth_agreement_footer";
import AuthDivider from "../../features/auth/components/ui/auth_divider";
import AuthFormSwitcher from "../../features/auth/components/ui/auth_form_switcher";

export default function LoginMain(): JSX.Element {
   return (
      <>
         <main
            className={`w-full lg:w-[65%] h-full justify-center items-center flex flex-col overflow-y-scroll rounded-r-md ${
               is_tauri ? "pt-[30px]" : ""
            }`}
         >
            <div className="min-w-[320px] w-[320px] min-w-500:w-[380px] min-w-1150:w-[420px] h-full px-4 py-6 flex flex-col min-h-668:mt-[100px] ">
               <AuthFormHeader
                  label="Welcome back"
                  desc="Login to your account"
               />
               <div className="flex flex-col gap-4">
                  <AuthDivider />
                  <AuthForm
                     form_id="login-form"
                     form_type="login"
                     form_method="POST"
                  />
               </div>
               <AuthFormSwitcher
                  desc="Don't have an account?"
                  link_path="/register"
                  link_label="Register Here"
               />
               <AuthAgreementFooter />
            </div>
         </main>
      </>
   );
}
