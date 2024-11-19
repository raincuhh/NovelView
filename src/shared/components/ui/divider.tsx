import { forwardRef, HTMLAttributes } from "react";

type DividerProps = HTMLAttributes<HTMLElement> & {
   text?: string;
   rootClassName?: string;
   textClassName?: string;
};

const Divider = forwardRef<HTMLDivElement, DividerProps>(
   ({ textClassName, text, rootClassName, ...props }: DividerProps, ref) => {
      return (
         <>
            <div ref={ref} {...props} className={`relative ${rootClassName || ""}`}>
               <hr className="bg-border-secondary h-[1px] w-full" />
               {text && (
                  <div
                     className={`${
                        textClassName || ""
                     } bg-background-primary text-text-normal absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%] px-2 font-family-primary font-weight-md`}
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
