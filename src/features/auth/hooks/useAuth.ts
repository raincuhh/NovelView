import { createContext, useContext } from "react";

import { UserRoles } from "@/shared/types";

type AuthContextProps = {
   accessToken: string | null;
   isAuth: boolean;
   role: UserRoles;
   loading: boolean;
   login: (username: string, password: string) => Promise<void>;
   logout: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const useAuth = (): AuthContextProps => {
   const context: AuthContextProps | undefined = useContext(AuthContext);

   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
   }

   return context;
};

export default useAuth;
