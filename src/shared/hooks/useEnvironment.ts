import { createContext, useContext } from "react";
import { TitlebarButtonTypes } from "../types";

type EnvironmentContextProps = {
   isTauri: boolean;
   isCapacitor: boolean;
   isMobile: boolean;
   showTitlebar: boolean;
   isProd: boolean;
   isDev: boolean;
   osInfo: string;
   setTitlebarButtons: React.Dispatch<React.SetStateAction<TitlebarButtonTypes[]>>;
};

export const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(
   undefined,
);

const useEnvironment = (): EnvironmentContextProps => {
   const context = useContext(EnvironmentContext);

   if (!context || context === undefined)
      throw new Error("useEnvironment can only be used within a EnvironmentProvider");

   return context;
};

export default useEnvironment;
