import React, { forwardRef, useState } from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & { text?: string };

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ text, ...props }: CheckboxProps, ref) => {
   const [checked, setChecked] = useState<boolean>(false);

   return (
      <>
         <div className="flex">
            <label className="relative flex h-full flex-row items-center gap-2">
               <input
                  ref={ref}
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  className={`h-4 w-4 shrink-0 appearance-none rounded-[4px] border-[1px] border-solid dark:border-border-secondary ${checked ? "dark:border-brand-button-bg dark:bg-brand-button-bg" : ""} dark:bg-background-primary-mobile dark:sm:bg-background-primary-alt`}
                  {...props}
               ></input>
               {checked && (
                  <>
                     <i className="bx bx-check absolute text-text-normal"></i>
                  </>
               )}
               <span className="font-family-primary text-fs-md font-weight-md">{text}</span>
            </label>
         </div>
      </>
   );
});

export default Checkbox;
