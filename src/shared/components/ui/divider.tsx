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
               <hr className="h-[1px] w-full bg-border-secondary" />
               {text && (
                  <div
                     className={`${
                        textClassName || ""
                     } absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%] bg-background-primary px-2 font-family-primary font-weight-md text-text-normal`}
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
