import React, { useState } from "react";

import { ViewSwitcherContext } from "../hooks/useViewSwitcher";

type ViewSwitcherProviderProps<T> = {
   initialView: T;
   children: React.ReactNode;
   duration: number;
};

export function ViewSwitcherProvider<T>({
   initialView,
   children,
   duration,
}: ViewSwitcherProviderProps<T>) {
   const [currentView, setCurrentView] = useState<T>(initialView);
   const [isAnimating, setIsAnimating] = useState(false);

   const changeView = (newPage: T) => {
      setIsAnimating(true);
      setTimeout(() => {
         setCurrentView(newPage);
         setIsAnimating(false);
      }, duration);
   };

   return (
      <ViewSwitcherContext.Provider value={{ currentView, changeView, isAnimating }}>
         {children}
      </ViewSwitcherContext.Provider>
   );
}
