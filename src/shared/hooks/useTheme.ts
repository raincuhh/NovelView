import { createContext, useContext } from "react";

import { Theme } from "../types/theme";

type ThemeContextProps = {
   defaultTheme: Theme;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const useTheme = (): ThemeContextProps => {
   const context = useContext(ThemeContext);

   if (context === undefined)
      throw new Error("useTheme must be used within a ThemeProvider");

   return context;
};

export default useTheme;
