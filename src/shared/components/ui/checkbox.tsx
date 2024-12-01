import React, { forwardRef, useState } from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & { text?: string };

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
   ({ text, ...props }: CheckboxProps, ref) => {
      const [checked, setChecked] = useState<boolean>(false);

      return (
         <>
            <div className="flex">
               <label className="relative flex flex-row items-center h-full gap-2">
                  <input
                     ref={ref}
                     type="checkbox"
                     checked={checked}
                     onChange={() => setChecked((prev) => !prev)}
                     className={`h-4 w-4 shrink-0 appearance-none rounded-radius-sm border-[1px] border-solid
                        checked:border-0 dark:bg-primary checked:dark:bg-interactive-accent
                        hover:checked:dark:bg-interactive-accent-hover dark:sm:bg-primary-alt
                        dark:border-modifier-border-color ${
                        checked
                              ? "dark:border-interactive-accent dark:bg-interactive-accent dark:sm:bg-interactive-accent"
                              : ""
                        } `}
                     {...props}
                  ></input>
                  {checked && (
                     <>
                        <i className="absolute bx bx-check text-text-normal"></i>
                     </>
                  )}
                  <span className="text-fs-md font-weight-md">{text}</span>
               </label>
            </div>
         </>
      );
   },
);

export default Checkbox;
