import {
   cva,
   VariantProps,
} from "class-variance-authority";
import { forwardRef, PropsWithChildren } from "react";

const ButtonVariants = cva(
   "flex items-center justify-center rounded-[1.5rem] text-fs-xs font-primary transition-colors duration-100 ease-in-out focus:outline-none disabled:pointer-events-none",
   {
      variants: {
         variant: {
            default: "",
            destructive: "",
            outline: "",
            ghost: "",
            link: "",
         },
         size: {
            sm: "py-1 px-2 text-fs-2xs",
            md: "py-2 px-4 text-fs-xs",
            lg: "py-3 px-6 text-fs-sm",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "sm",
      },
   }
);

type ButtonProps =
   React.ButtonHTMLAttributes<HTMLButtonElement> &
      VariantProps<typeof ButtonVariants> & {
         text?: string;
      };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   (
      {
         text,
         variant,
         size,
         className,
         children,
         ...props
      },
      ref
   ) => (
      <>
         <Button
            ref={ref}
            className={ButtonVariants({
               variant,
               size,
               className,
            })}
            {...props}
         >
            {text || children}
         </Button>
      </>
   )
);

export default Button;
