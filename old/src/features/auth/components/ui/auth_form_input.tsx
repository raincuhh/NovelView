// import { useState } from "react";
// import { Link } from "react-router-dom";

// import { AuthInputType } from "../../lib/types";
// import { uppercaseify } from "../../../../shared/lib/utils";
// import FormInput from "../../../../shared/components/forms/form_input";

// type AuthFormInputProps = {
//    formType: "login" | "register";
//    inputType: AuthInputType;
//    label: string;
//    value: string;
//    errorMessage: string;
//    onInputChange: (value: string, error: string) => void;
// };

// export default function AuthFormInput({
//    formType,
//    inputType,
//    label,
//    errorMessage,
//    onInputChange,
// }: AuthFormInputProps): JSX.Element {
//    const [password_field_type, setPasswordFieldType] = useState<string>("password");

//    const togglePasswordFieldType = () => {
//       setPasswordFieldType((prev) => (prev === "password" ? "text" : "password"));
//    };

//  const placeholders = {
//     email: "user@example.com",
//     password: "password",
//     username: "cooldog123",
//  };

//    const validateInput = (value: string) => {
//       let error: string = "";
//       const emptyValue = value.length <= 0;

//       switch (inputType) {
//          case "email":
//             const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//             if (!emptyValue && !emailRegex.test(value)) {
//                error = "Invalid email format";
//             }
//             break;
//          case "password":
//             const minimumOneUppercase: RegExp = /[A-Z]/;
//             const minimumOneSpecial: RegExp = /[!@#$%^&*(),.?":{}|<>]/;

//             if (!emptyValue && value.length < 8) {
//                error = "Password must be atleast 8 characters long";
//             } else if (!emptyValue && !minimumOneUppercase.test(value)) {
//                error = "Password must contain atleast one uppercase letter";
//             } else if (!emptyValue && !minimumOneSpecial.test(value)) {
//                error = "Password must contain atleast one special letter";
//             }
//             break;
//          default:
//             break;
//       }

//       onInputChange(value, error);
//    };

//    const handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
//       const new_val = value.target.value;
//       if (formType === "login") return;
//       validateInput(new_val);
//    };

//    const isPasswordLoginInput = () => {
//       return inputType === "password" && formType === "login";
//    };

//    return (
//       <>
//          <div className="flex flex-col">
//             <div className="relative flex flex-col">
//                <div className="flex flex-row space-x-2 justify-between mb-2">
//                   <label
//                      htmlFor={`${formType}_${label}`}
//                      className="font-c-primary font-c-weight-md text-c-md dark:text-text-muted"
//                   >
//                      {uppercaseify(label)}
//                   </label>
//                   {isPasswordLoginInput() && (
//                      <div>
//                         <Link to="/login/forgot-password">
//                            <p className="font-c-primary font-c-weight-md dark:text-c-text-faint text-c-md hover:text-text-muted transition-colors duration-100 ease-in-out">
//                               Forgot password?
//                            </p>
//                         </Link>
//                      </div>
//                   )}
//                </div>
//                <div className="flex flex-col">
//                   <div>
//                      <div className="relative">
//                         <FormInput
//                            type={inputType !== "password" ? inputType : password_field_type}
//                            name={`${formType}_${label}`}
//                            id={`${formType}_${label}`}
//                            placeholder={placeholders[inputType]}
//                            aria_placeholder={placeholders[inputType]}
//                            auto_complete={inputType}
//                            on_change_callback={handleChange}
//                            css={`
//                               transition-transform
//                               ${
//                                  errorMessage &&
//                                  "!bg-destructive-200 !border-destructive-300 !text-c-text-error"
//                               }
//                            `}
//                         />
//                         <div className="flex">
//                            <div
//                               className={`absolute top-[50%] translate-x-[0] translate-y-[-50%] dark:bg-c-background-primary-alt ${
//                                  errorMessage && "bg-destructive-200"
//                               } right-0  flex flex-row items-center mr-[2px]`}
//                            >
//                               {errorMessage && (
//                                  <i
//                                     className={`bx bx-error-circle text-c-text-error pl-2 ${
//                                        isPasswordLoginInput() ? "pr-[8px]" : "pr-2"
//                                     } text-fs-md`}
//                                  ></i>
//                               )}
//                               {inputType === "password" && (
//                                  <div className="">
//                                     <div
//                                        onClick={() => togglePasswordFieldType()}
//                                        className="mr-2 w-8 h-7 dark:bg-c-background-primary-alt dark:hover:bg-c-background-secondary border-solid dark:border-c-border-secondary dark:hover:border-border-tertiary border-[1px] rounded-[4px] transition-colors duration-100 ease-in-out"
//                                     >
//                                        <div
//                                           className="h-full w-full flex justify-center items-center text-c-md font-c-primary pointer-events-none cursor-pointer select-none"
//                                           style={{
//                                              fontWeight: 500,
//                                           }}
//                                        >
//                                           w
//                                        </div>
//                                     </div>
//                                  </div>
//                               )}
//                            </div>
//                         </div>
//                      </div>
//                   </div>
//                   <div className="text-c-text-error font-c-primary font-c-weight-md">
//                      {errorMessage && (
//                         <p className="mt-2 text-c-md break-words transition-all">{errorMessage}</p>
//                      )}
//                   </div>
//                </div>
//             </div>
//          </div>
//       </>
//    );
// }
