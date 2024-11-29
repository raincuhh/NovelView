import { useRef } from "react";

type LabeledCheckBoxProps = {
   text: string;
   name?: string;
   id?: string;
};

export default function LabeledCheckBox({ text, name, id }: LabeledCheckBoxProps) {
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
            className="flex flex-row items-center mt-2 transition-colors duration-100 ease-in-out cursor-pointer
               select-none font-c-primary font-c-weight-md dark:text-c-text-faint text-c-md
               dark:hover:text-c-text-muted"
         >
            <FormCheckBox
               ref={check_box_ref}
               name={name}
               id={id}
               css="group-hover:border-border-tertiary group-hover:bg-background-primary-alt"
            />
            <p onClick={handle_click} className="pl-2 cursor-pointer">
               {text}
            </p>
         </div>
      </>
   );
}
