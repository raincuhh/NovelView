// import { cva, VariantProps } from "class-variance-authority";
// import React, { forwardRef } from "react";

const inputVariants = cva(
   "select-all border-solid border-[1px] transition-colors duration-100 ease-in-out cursor-pointer",
   {
      variants: {
         variant: {
            base: "dark:bg-modifier-primary-form-field dark:sm:bg-modifier-secondary-form-field dark:border-modifier-border-color dark:hover:border-modifier-border-hover dark:hover:focus:border-modifier-border-color rounded-radius-sm px-4 py-2 dark:placeholder:text-form-placeholder focus:outline-none dark:focus:outline-modifier-border-color focus:outline-offset-[0px]",
            textBrand: "",
         },
      },
      defaultVariants: {
         variant: "base",
      },
   },
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
   VariantProps<typeof inputVariants> & {
      type?: "text" | "password";
   };

const Input = forwardRef<HTMLInputElement, InputProps>(
   ({ className, variant, type = "text", checked, ...props }, ref) => {
      const classes = inputVariants({ variant, className });

      return (
         <>
            <input ref={ref} type={type} className={classes} {...props} />
         </>
      );
   },
);

export default Input;
