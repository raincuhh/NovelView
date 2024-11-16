import { useState, useImperativeHandle, forwardRef } from "react";

type FormCheckBoxProps = {
   name?: string;
   id?: string;
   css?: string;
   isChecked?: boolean;
};

const FormCheckBox = forwardRef(({ name, id, css, isChecked }: FormCheckBoxProps, ref) => {
   const [checked, set_checked] = useState<boolean>(false);

   const handle_checked_on_click = () => {
      set_checked(!checked);
      isChecked = checked;
   };

   useImperativeHandle(ref, () => ({
      toggle_checked: () => set_checked((prev) => !prev),
      set_checked_: (value: boolean) => set_checked(value),
   }));

   return (
      <>
         <div className="relative items-center flex justify-center">
            <input
               type="checkbox"
               name={name}
               id={id}
               checked={checked}
               onClick={handle_checked_on_click}
               readOnly
               className={`cursor-pointer appearance-none shrink-0 w-4 h-4 border-[1px] transition-colors duration-100 ease-in-out border-solid border-border-secondary rounded-[4px] bg-background-secondary checked:hover:bg-brand-500 checked:bg-brand-button-bg checked:hover:border-brand-600 checked:border-brand-button-bg-hover ${css}`}
            />
            {checked && (
               <i className="bx bx-check absolute translate-x-[-0%] translate-y-[-5%] select-none text-text-normal pointer-events-none"></i>
            )}
         </div>
      </>
   );
});

export default FormCheckBox;
