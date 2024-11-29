// import { useEffect } from "react";
// import { Location, useLocation } from "react-router-dom";

export default function StyleSheetLoader(): null {
   const location: Location<any> = useLocation();
   const url: string = location.pathname;

   useEffect(() => {
      const path: string = getStyleSheetName(url);
      import(`../../../public/css/${path}`)
         .then(() => {
            console.log(`${path} loaded`);
         })
         .catch(() => console.error(`Error: Failed to load ${path}`));
   }, [url]);

   return null;
}

function getStyleSheetName(pathName: string): string {
   switch (pathName) {
      default:
         return "global.css";
   }
}
