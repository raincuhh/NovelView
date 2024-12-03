import { createContext, useContext } from "react";

type ViewSwitcherContextType<T> = {
   currentView: T;
   changeView: (page: T, newDirection: number) => void;
   isAnimating: boolean;
   direction: number;
   getDirection: (currentView: T, targetView: T) => number;
   viewSwitcherNavigate: (targetView: T) => void;
};

export const ViewSwitcherContext = createContext<ViewSwitcherContextType<any> | null>(
   null,
);

const useViewSwitcher = <T>() => {
   const context = useContext(ViewSwitcherContext);
   if (!context) {
      throw new Error("useViewSwitcher must be used within a ViewSwitcherProvider");
   }
   return context as ViewSwitcherContextType<T>;
};

export default useViewSwitcher;
