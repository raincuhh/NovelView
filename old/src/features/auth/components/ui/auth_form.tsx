// import { useEffect, useState } from "react";

// import AuthFormInput from "./auth_form_input";
// import RenderList from "../../../../shared/components/utils/render_list";
// import { AuthInputType } from "../../lib/types";
// import { uppercaseify } from "../../../../shared/lib/utils";
// import FormButton from "../../../../shared/components/forms/form_button";
// import LabeledCheckBox from "../../../../shared/components/ui/labeled_check_box";

// type AuthFormProps = {
//    formId: string;
//    formType: "login" | "register";
//    formMethod: "POST" | "GET";
// };

// export default function AuthForm({ formId, formType, formMethod }: AuthFormProps): JSX.Element {
//    const form_inputs: AuthInputType[] =
//       formType === "register" ? ["username", "email", "password"] : ["username", "password"];

//    const [remember_me, set_remember_me] = useState<boolean>(false);
//    const [form_data, set_form_data] = useState<{
//       [key: string]: string;
//    }>({});
//    const [form_errors, set_form_errors] = useState<{
//       [key: string]: string;
//    }>({});

//    useEffect(() => {
//       console.log(form_errors);
//       console.log(form_data);
//       console.log(remember_me);
//    }, [form_errors, form_data, remember_me]);

//    const handle_input_change = (field: string, value: string, error: string) => {
//       set_form_data((prev: any) => ({
//          ...prev,
//          [field]: value,
//       }));
//       set_form_errors((prev: any) => ({
//          ...prev,
//          [field]: error,
//       }));
//    };

//    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       set_remember_me(e.target.checked);
//    };

//    return (
//       <>
//          <form id={formId} method={formMethod}>
//             <div className="flex flex-col gap-4">
//                <RenderList
//                   data={form_inputs}
//                   to_render={(inputType) => (
//                      <AuthFormInput
//                         key={inputType}
//                         formType={formType}
//                         inputType={inputType}
//                         label={inputType}
//                         value={form_data[inputType] || ""}
//                         errorMessage={form_errors[inputType] || ""}
//                         onInputChange={(value: string, error: string) => {
//                            handle_input_change(inputType, value, error);
//                         }}
//                      />
//                   )}
//                />
//             </div>
//             <div>{formType === "login" && <LabeledCheckBox text="Remember me?" />}</div>

//             <div className="relative"></div>
//             <div className="mt-8">
//                <FormButton text={uppercaseify(formType)} />
//             </div>
//          </form>
//       </>
//    );
// }
