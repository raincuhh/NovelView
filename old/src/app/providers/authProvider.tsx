import { PropsWithChildren, useEffect, useState, useMemo } from "react";

import { AuthContext } from "../../features/auth/lib/hooks";
import { UserRoles } from "../../shared/lib/types";

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
   const [jwtToken, setJwtToken] = useState<string | null>(
      localStorage.getItem("JWT_TOKEN_KEY"),
   );
   const [role, setRole] = useState<UserRoles>(UserRoles.guest);
   const [loading, setLoading] = useState<boolean>(false);

   const isAuthenticated = !!jwtToken;

   useEffect(() => {}, [jwtToken]);

   const login = async (username: string, password: string) => {
      setLoading(true);
      try {
      } catch (err) {
      } finally {
         setLoading(false);
      }
   };

   const logout = async () => {};

   const handleJwtToken = async (jwtToken: string) => {
      setLoading(true);
      try {
      } catch (err) {
      } finally {
         setLoading(false);
      }
   };

   const context_value = useMemo(
      () => ({
         jwtToken,
         role,
         loading,
         login,
         logout,
         handleJwtToken,
      }),
      [jwtToken, role, loading, login, logout],
   );

   return <AuthContext.Provider value={context_value}>{children}</AuthContext.Provider>;
}
