import { createContext, useContext } from "react";

type EnvironmentContextProps = {
   isTauri: boolean;
   isCapacitor: boolean;
   isMobile: boolean;
   showTitlebar: boolean;
   isProd: boolean;
   isDev: boolean;
   osInfo: string;
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
