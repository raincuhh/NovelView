import { useEffect, useState } from "react";

import AuthFormInput from "./auth_form_input";
import RenderList from "../../../../shared/components/utils/render_list";
import { AuthInputType } from "../../lib/types";
import { uppercaseify } from "../../../../shared/lib/utils";
import FormButton from "../../../../shared/components/forms/form_button";
import LabeledCheckBox from "../../../../shared/components/ui/labeled_check_box";

type AuthFormProps = {
   form_id: string;
   form_type: "login" | "register";
   form_method: "POST" | "GET";
};

export default function AuthForm({
   form_id,
   form_type,
   form_method,
}: AuthFormProps): JSX.Element {
   const form_inputs: AuthInputType[] =
      form_type === "register"
         ? ["username", "email", "password"]
         : ["username", "password"];

   const [remember_me, set_remember_me] = useState(false);
   const [form_data, set_form_data] = useState<{
      [key: string]: string;
   }>({});
   const [form_errors, set_form_errors] = useState<{
      [key: string]: string;
   }>({});

   useEffect(() => {
      console.log(form_errors);
      console.log(form_data);
      console.log(remember_me);
   }, [form_errors, form_data, remember_me]);

   const handle_input_change = (
      field: string,
      value: string,
      error: string
   ) => {
      set_form_data((prev: any) => ({
         ...prev,
         [field]: value,
      }));
      set_form_errors((prev: any) => ({
         ...prev,
         [field]: error,
      }));
   };

   const handle_remember_me_change = (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      set_remember_me(e.target.checked);
   };

   return (
      <>
         <form id={form_id} method={form_method}>
            <div className="flex flex-col gap-4">
               <RenderList
                  data={form_inputs}
                  to_render={(input_type) => (
                     <AuthFormInput
                        key={input_type}
                        form_type={form_type}
                        input_type={input_type}
                        label={input_type}
                        value={form_data[input_type] || ""}
                        error_message={
                           form_errors[input_type] || ""
                        }
                        on_input_change={(
                           value: string,
                           error: string
                        ) => {
                           handle_input_change(
                              input_type,
                              value,
                              error
                           );
                        }}
                     />
                  )}
               />
            </div>
            <div>
               {form_type === "login" && (
                  <LabeledCheckBox text="Remember me?" />
               )}
            </div>

            <div className="relative"></div>
            <div className="mt-8">
               <FormButton text={uppercaseify(form_type)} />
            </div>
         </form>
      </>
   );
}
