import { createContext, useContext, useState, useCallback } from "react";
import { EnvironmentContextProps } from "../types/providers";

export const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(
   undefined,
);

export const useEnvironment = (): EnvironmentContextProps => {
   const context: EnvironmentContextProps | undefined = useContext(EnvironmentContext);

   if (context === undefined) {
      throw new Error("useEnvironment must be used within an EnvironmentProvider");
   }

   return context;
};
