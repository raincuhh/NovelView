import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";

const inputVariants = cva(
   "border-solid border-[1px] transition-colors duration-100 ease-in-out cursor-pointer",
   {
      variants: {
         variant: {
            textDefault: "",
            textBrand: "",
            checkBoxDefault: "w-4 h-4 shrink-0 dark:border-c-border-secondary dark:sm:hover:border-c-border",
            checkBoxBrand: "",
         },
      },
      defaultVariants: {
         variant: "textDefault",
      },
   }
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
   VariantProps<typeof inputVariants> & {
      type?: "text" | "password" | "checkbox";
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
      // setChecked?: (checked: boolean) => void;
   };

const Input = forwardRef<HTMLInputElement, InputProps>(
   ({ className, variant, type = "text", checked, onChange, ...props }, ref) => {
      const classes = inputVariants({ variant, className });

      return (
         <>
            {type === "checkbox" ? (
               <>
                  <div className="relative items-center justify-center">
                     <input
                        ref={ref}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        className={classes}
                        {...props}
                     />
                     {checked && (
                        <>
                           <i className="bx bx-check absolute translate-x-[-0%] translate-y-[-5%] select-none text-text-normal pointer-events-none"></i>
                        </>
                     )}
                  </div>
               </>
            ) : (
               <>
                  <input ref={ref} type={type} className={classes} {...props} />
               </>
            )}
         </>
      );
   }
);

export default Input;
