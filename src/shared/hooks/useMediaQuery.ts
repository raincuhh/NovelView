import React, { useState, useEffect } from "react";

type UseMediaQueryProps = { mediaQuery: string };

export default function useMediaQuery({ mediaQuery }: UseMediaQueryProps) {
   const [isMatch, setIsMatch] = useState<boolean>(false);

   useEffect(() => {
      const mediaQueryList: MediaQueryList = window.matchMedia(mediaQuery);

      setIsMatch(mediaQueryList.matches);

      const listener: (e: MediaQueryListEvent) => void = (e: MediaQueryListEvent) => {
         setIsMatch(e.matches);
      };

      mediaQueryList.addEventListener("change", listener);
      return () => mediaQueryList.removeEventListener("change", listener);
   }, [mediaQuery]);

   return isMatch;
}
