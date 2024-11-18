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
               <hr className="bg-border-secondary h-[1px] w-full" />
               {text && (
                  <div
                     className={`${
                        textClassName || ""
                     } bg-background-primary font-family-primary font-weight-md text-text-normal absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%] px-2`}
                  >
                     {text}
                  </div>
               )}
            </div>
         </>
      );
   },
);

export default Divider;
