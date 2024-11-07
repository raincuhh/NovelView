import {
   createContext,
   useContext,
   useState,
   useCallback,
} from "react";
import { EnvironmentContextProps } from "./types";

export const EnvironmentContext = createContext<
   EnvironmentContextProps | undefined
>(undefined);

export const use_environment =
   (): EnvironmentContextProps => {
      const context: EnvironmentContextProps | undefined =
         useContext(EnvironmentContext);

      if (context === undefined) {
         throw new Error(
            "use_environment must be used within an EnvironmentProvider"
         );
      }

      return context;
   };
