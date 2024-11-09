import AuthFormInput from "./auth_form_input";
import RenderList from "../../../../shared/components/utils/render_list";
import { AuthInputType } from "../../lib/types";

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
   const formInputs: AuthInputType[] =
      form_type === "register"
         ? ["username", "email", "password"]
         : ["username", "password"];

   return (
      <>
         <form id={form_id} method={form_method}>
            <div className="flex flex-col gap-4">
               <RenderList
                  data={formInputs}
                  to_render={(input_type) => (
                     <AuthFormInput
                        key={input_type}
                        form_type={form_type}
                        input_type={input_type}
                        label={input_type}
                     />
                  )}
               />
            </div>
         </form>
      </>
   );
}
