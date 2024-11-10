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
            className="cursor-pointer flex flex-row mt-2 font-primary text-text-faint text-fs-xs hover:text-text-muted items-center select-none transition-colors duration-100 ease-in-out"
            style={{ fontWeight: 500 }}
         >
            <FormCheckBox
               ref={check_box_ref}
               name={name}
               id={id}
               css="group-hover:border-border-tertiary group-hover:bg-background-primary-alt"
            />
            <p
               onClick={handle_click}
               className="cursor-pointer pl-2"
            >
               {text}
            </p>
         </div>
      </>
   );
}
