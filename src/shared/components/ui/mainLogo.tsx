import React, { useEffect, useState } from "react";

type MainLogoProps = {
   variant?: "white" | "black" | "purple";
   className?: string;
};

export default function MainLogo({
   variant = "white",
   className,
}: MainLogoProps): JSX.Element {
   const [isLoaded, setIsLoaded] = useState<boolean>(false);

   const srcPaths = {
      white: "/assets/images/logo_white.png",
      black: "/assets/images/logo_black.png",
      purple: "/assets/images/logo_purple.png",
   };

   useEffect(() => {
      Object.values(srcPaths).forEach((src) => {
         const img = new Image();
         img.src = src;
      });
   }, []);

   return (
      <>
         <div className="relative">
            {!isLoaded && (
               <div
                  className={`dark:bg-background-primary-alt absolute rounded-[4px] ${className}`}
               ></div>
            )}
            <img
               src={srcPaths[variant]}
               alt="Main Logo"
               onLoad={() => setIsLoaded(true)}
               className={className}
            ></img>
         </div>
      </>
   );
}
