type FormInputProps = {
   form_type: "login" | "register";
   input_type: "email" | "password";
   label: string;
};

export default function FormInput({
   form_type,
   input_type,
   label,
}: FormInputProps): JSX.Element {
   const placeholders = {};

   return (
      <>
         <div className="flex flex-col">
            <div className="flex flex-row space-x-2 justify-between">
               <label htmlFor={label}>{label}</label>
            </div>
            <div className="flex flex-col">
               <div>
                  <div className="relative">
                     <input
                        type={input_type}
                        name={label}
                        id=""
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
