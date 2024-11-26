import { useState, createContext, useContext } from "react";

type ViewSwitcherContextType<T> = {
   currentView: T;
   changeView: (page: T) => void;
   isAnimating: boolean;
};

export const ViewSwitcherContext = createContext<ViewSwitcherContextType<any> | null>(
   null,
);

export function useViewSwitcher<T>() {
   const context = useContext(ViewSwitcherContext);
   if (!context) {
      throw new Error("useViewSwitcher must be used within a ViewSwitcherProvider");
   }
   return context as ViewSwitcherContextType<T>;
}
