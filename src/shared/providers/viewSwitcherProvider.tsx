import React, { useState } from "react";

import { ViewSwitcherContext } from "../hooks/useViewSwitcher";

type ViewSwitcherProviderProps<T extends { [key: string]: string }> = {
   initialView: T[keyof T];
   children: React.ReactNode;
   duration: number;
   type: T;
};

const getEnumValues = <T extends { [key: string]: string }>(enumType: T): string[] => {
   return Object.values(enumType);
};

const ViewSwitcherProvider = <T extends { [key: string]: string }>({
   initialView,
   children,
   duration,
   type,
}: ViewSwitcherProviderProps<T>) => {
   const [currentView, setCurrentView] = useState<T[keyof T]>(initialView);
   const [isAnimating, setIsAnimating] = useState<boolean>(false);
   const [direction, setDirection] = useState<number>(0);

   const changeView = (newPage: T[keyof T], newDirection: number) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setDirection(newDirection);
      setTimeout(() => {
         setCurrentView(newPage);
         setIsAnimating(false);
      }, duration);
   };

   const getDirection = (currentView: T[keyof T], targetView: T[keyof T]): number => {
      const views = getEnumValues(type);
      return views.indexOf(targetView) > views.indexOf(currentView) ? 1 : -1;
   };

   const viewSwitcherNavigate = (targetView: T[keyof T]) => {
      const direction = getDirection(currentView, targetView);
      if (!isAnimating) changeView(targetView, direction);
   };

   return (
      <ViewSwitcherContext.Provider
         value={{
            currentView,
            changeView,
            isAnimating,
            direction,
            getDirection,
            viewSwitcherNavigate,
         }}
      >
         {children}
      </ViewSwitcherContext.Provider>
   );
};

export default ViewSwitcherProvider;
