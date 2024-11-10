import {
   useState,
   useImperativeHandle,
   forwardRef,
} from "react";

type FormCheckBoxProps = {
   name?: string;
   id?: string;
   css?: string;
};

const FormCheckBox = forwardRef(
   ({ name, id, css }: FormCheckBoxProps, ref) => {
      const [checked, set_checked] = useState(false);

      const handle_checked_on_click = () => {
         set_checked(!checked);
      };

      useImperativeHandle(ref, () => ({
         toggle_checked: () => set_checked((prev) => !prev),
         set_checked_: (value: boolean) =>
            set_checked(value),
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
                  className={`cursor-pointer appearance-none shrink-0 w-4 h-4 border-[1px] transition-colors duration-100 ease-in-out border-solid border-border-secondary hover:border-border-tertiary rounded-[4px] bg-background-secondary hover:bg-background-primary-alt checked:hover:bg-brand-500 checked:bg-brand-400 checked:hover:border-brand-600 checked:border-brand-500 ${css}`}
               />
               {checked && (
                  <i className="bx bx-check absolute translate-x-[-0%] translate-y-[-5%] select-none text-text-normal pointer-events-none"></i>
               )}
            </div>
         </>
      );
   }
);

export default FormCheckBox;

/*
export default function FormCheckBox({
   name,
   id,
}: FormCheckBoxProps) {
   const [checked, set_checked] = useState(false);

   const handle_checked_on_click = () => {
      const new_state = !checked;
      set_checked(new_state);
   };

   return (
      <>
         <div className="relative">
            <input
               type="checkbox"
               name={name}
               id={id}
               checked={checked}
               onClick={() => {
                  handle_checked_on_click();
                  console.log(checked);
               }}
               className={
                  "cursor-pointer appearance-none shrink-0 w-4 h-4 border-[1px] border-solid border-border-secondary hover:border-border-tertiary rounded-[4px] bg-background-secondary hover:bg-background-primary-alt checked:hover:bg-brand-500 checked:bg-brand-400 checked:hover:border-brand-600 checked:border-brand-500"
               }
            />
            {checked && (
               <i className="bx bx-check absolute translate-x-[-100%] translate-y-[5%] select-none text-text-normal pointer-events-none"></i>
            )}
         </div>
      </>
   );
}
*/
