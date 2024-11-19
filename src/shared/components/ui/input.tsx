import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";

const inputVariants = cva(
   "border-solid border-[1px] transition-colors duration-100 ease-in-out cursor-pointer ",
   {
      variants: {
         variant: {
            textDefault:
               "dark:bg-background-primary-mobile dark:sm:bg-background-primary-alt dark:border-border-secondary rounded-[4px] px-4 py-2 dark:placeholder:text-text-faint focus:outline-none dark:focus:outline-background-secondary-alt focus:outline-offset-[0px]",
            textBrand: "",
         },
      },
      defaultVariants: {
         variant: "textDefault",
      },
   },
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
   VariantProps<typeof inputVariants> & {
      type?: "text" | "password";
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
      // setChecked?: (checked: boolean) => void;
   };

const Input = forwardRef<HTMLInputElement, InputProps>(
   ({ className, variant, type = "text", checked, onChange, ...props }, ref) => {
      const classes = inputVariants({ variant, className });

      return (
         <>
            <input ref={ref} type={type} className={classes} {...props} />
            {/* {type === "checkbox" ? (
               <>
                  <div className="relative h-min w-min items-center justify-center">
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
                           <i className="bx bx-check pointer-events-none absolute translate-x-[-0%] translate-y-[-5%] select-none text-text-normal"></i>
                        </>
                     )}
                  </div>
               </>
            ) : (
               <>
                  <input ref={ref} type={type} className={classes} {...props} />
               </>
            )} */}
         </>
      );
   },
);

export default Input;
