import { isTauri } from "../../shared/lib/tauri_utils";

import AuthFormHeader from "../../features/auth/components/ui/auth_form_header";
import AuthForm from "../../features/auth/components/ui/auth_form";
import AuthAgreementFooter from "../../features/auth/components/ui/auth_agreement_footer";
import AuthDivider from "../../features/auth/components/ui/auth_divider";
import AuthFormSwitcher from "../../features/auth/components/ui/auth_form_switcher";

export default function RegisterMain(): JSX.Element {
   return (
      <>
         <main
            className={`flex h-full w-full flex-col items-center justify-center overflow-y-scroll rounded-r-md
               lg:w-[65%] ${isTauri ? "pt-[30px]" : ""}`}
         >
            <div
               className="c-min-w-500:w-[380px] c-min-w-1150:w-[420px] c-min-h-668:mt-[100px] flex h-full w-[320px]
                  min-w-[320px] flex-col px-4 py-6"
            >
               {/* <AuthFormHeader
                  label="Hi"
                  desc="Create a new account"
               /> */}
               <div className="mt-4 flex flex-col">
                  {/* <AuthDivider /> */}
                  <AuthForm
                     formId="register-form"
                     formType="register"
                     formMethod="POST"
                  />
               </div>
               <AuthFormSwitcher
                  desc="Already have an account?"
                  link_path="/login"
                  link_label="Login Here"
               />
               <AuthAgreementFooter />
            </div>
         </main>
      </>
   );
}
