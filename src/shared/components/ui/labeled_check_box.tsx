import { useRef } from "react";
import FormCheckBox from "../forms/form_check_box";

type LabeledCheckBoxProps = {
   text: string;
   name?: string;
   id?: string;
};

export default function LabeledCheckBox({
   text,
   name,
   id,
}: LabeledCheckBoxProps) {
   const check_box_ref = useRef<{
      toggle_checked: () => void;
      set_checked: (value: boolean) => void;
   } | null>(null);

   const handle_click = () => {
      check_box_ref.current?.toggle_checked();
   };

   return (
      <>
         <div
            className="cursor-pointer flex flex-row mt-2 font-primary text-text-muted text-fs-xs hover:text-text-faint items-center select-none"
            style={{ fontWeight: 500 }}
         >
            <FormCheckBox
               ref={check_box_ref}
               name={name}
               id={id}
            />
            <p
               onClick={handle_click}
               className="transition-colors duration-100 ease-in-out cursor-pointer pl-2"
            >
               {text}
            </p>
         </div>
      </>
   );
}
