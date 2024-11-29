import { createContext, useContext } from "react";

type ThemeContextProps = {};

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const useTheme = (): ThemeContextProps => {
   return {};
};

export default useTheme;
