import { createContext, useContext } from "react";
// import { UserRoles } from "../../../shared/types/user";

type AuthContextProps = {
   accessToken: string | null;
   isAuthenticated: boolean;
   role: UserRoles;
   loading: boolean;
   login: (username: string, password: string) => Promise<void>;
   logout: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
   const context: AuthContextProps | undefined = useContext(AuthContext);

   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
   }

   return context;
};
