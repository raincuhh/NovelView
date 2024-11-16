import { forwardRef, HTMLAttributes } from "react";

type DividerProps = HTMLAttributes<HTMLElement> & {
   text?: string;
   rootClassName?: string;
   textClassName?: string;
};

const Divider = forwardRef<HTMLDivElement, DividerProps>(
   ({ textClassName, text, rootClassName, ...props }, ref) => {
      return (
         <>
            <div ref={ref} {...props} className={`relative ${rootClassName || ""}`}>
               <hr className="h-[1px] w-full bg-c-border-secondary" />
               {text && (
                  <div
                     className={`${
                        textClassName || ""
                     } font-c-family-primary font-c-weight-md text-c-text-normal absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] bg-c-background-primary px-2`}
                  >
                     {text}
                  </div>
               )}
            </div>
         </>
      );
   }
);

export default Divider;
