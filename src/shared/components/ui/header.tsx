import React, { forwardRef } from "react";

type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {
   className?: string;
   headerClassName?: string;
   subClassName?: string;
};

const Header = forwardRef<HTMLDivElement, HeaderProps>(
   (
      { className, headerClassName, subClassName, children, ...props }: HeaderProps,
      ref,
   ) => {
      return (
         <>
            <div ref={ref} className={`flex flex-col font-family-primary ${className}`}>
               <header className={` ${headerClassName}`}></header>
            </div>
         </>
      );
   },
);
