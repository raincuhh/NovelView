import { createContext, useContext } from "react";
import { AuthContextProps } from "./types";
import { UserRoles } from "../../../shared/lib/types";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
   const context: AuthContextProps | undefined = useContext(AuthContext);

   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
   }

   return context;
};
