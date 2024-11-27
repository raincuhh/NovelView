import React, { useState } from "react";

import { ViewSwitcherContext } from "../hooks/useViewSwitcher";

type ViewSwitcherProviderProps<TEnum extends { [key: string]: string }> = {
   initialView: TEnum[keyof TEnum];
   children: React.ReactNode;
   duration: number;
   type: TEnum;
};

function getEnumValues<TEnum extends { [key: string]: string }>(
   enumType: TEnum,
): string[] {
   return Object.values(enumType);
}

export function ViewSwitcherProvider<TEnum extends { [key: string]: string }>({
   initialView,
   children,
   duration,
   type,
}: ViewSwitcherProviderProps<TEnum>) {
   const [currentView, setCurrentView] = useState<TEnum[keyof TEnum]>(initialView);
   const [isAnimating, setIsAnimating] = useState<boolean>(false);
   const [direction, setDirection] = useState<number>(0);

   const changeView = (newPage: TEnum[keyof TEnum], newDirection: number) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setDirection(newDirection);
      setTimeout(() => {
         setCurrentView(newPage);
         setIsAnimating(false);
      }, duration);
   };

   const getDirection = (
      currentView: TEnum[keyof TEnum],
      targetView: TEnum[keyof TEnum],
   ): number => {
      const views = getEnumValues(type);
      return views.indexOf(targetView) > views.indexOf(currentView) ? 1 : -1;
   };

   const navigate = (targetView: TEnum[keyof TEnum]) => {
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
            navigate,
         }}
      >
         {children}
      </ViewSwitcherContext.Provider>
   );
}
