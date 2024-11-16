import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Link } from "react-router-dom";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
   "flex items-center justify-center font-c-weight-md font-c-family-primary transition-colors duration-100 ease-in-out focus:outline-none disabled:pointer-events-none",
   {
      variants: {
         variant: {
            default: "bg-c-brand-button-bg sm:hover:bg-c-brand-button-bg-hover",
            destructive: "bg",
            ghost: "bg-transparent sm:hover:bg-c-background-primary-alt",
            outline:
               "bg-transparent text-c-text-normal sm:hover:text-c-text-muted border-solid border-[1px] border-c-border-secondary",
            link: "underline text-c-brand-default sm:hover:text-c-brand-600",
         },
         size: {
            sm: "py-1 px-2 text-c-fs-sm",
            md: "py-2 px-4 text-c-fs-md",
            lg: "py-3 px-6 text-c-fs-lg",
         },
         rounded: {
            sm: "rounded-[2px]",
            md: "rounded-[5px]",
            full: "rounded-[6.66rem]",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "md",
      },
   }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
   VariantProps<typeof buttonVariants> & {
      href?: string;
      text?: string;
   };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, children, text, href, variant, size, rounded = "md", ...props }, ref) => {
      const classes = buttonVariants({ variant, size, rounded, className });

      if (href) {
         return (
            <>
               <Link to={href} className={classes}>
                  {text || children}
               </Link>
            </>
         );
      }

      return (
         <>
            <button ref={ref} className={classes} {...props}>
               {text || children}
            </button>
         </>
      );
   }
);

export default Button;
