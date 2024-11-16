import React from "react";

type MainLogoProps = {
   variant?: "white" | "black" | "purple";
   className?: string;
};

export default function MainLogo({ variant = "white", className = "" }: MainLogoProps): JSX.Element {
   const srcPaths = {
      white: "../../../../public/assets/images/logo_base_90.png",
      black: "../../../../public/assets/images/logo_black.png",
      purple: "../../../../public/assets/images/logo_purple.png",
   };

   return <img src={srcPaths[variant]} alt="Main Logo" className={className} />;
}
