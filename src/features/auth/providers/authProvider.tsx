import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";

import { AuthContext } from "../hooks/useAuth";
import { UserRoles } from "@/shared/types";

// https://v2.tauri.app/plugin/store/

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
   const [accessToken, setAccessToken] = useState<string | null>(
      localStorage.getItem("ACCESS_TOKEN"),
   );
   const [isAuth, setIsAuth] = useState<boolean>(false);
   const [role, setRole] = useState<UserRoles>(UserRoles.user);
   const [loading, setLoading] = useState<boolean>(true);

   const refreshAccessToken = useCallback(async () => {
      try {
      } catch (err) {
         console.error("Error refreshing token: ", err);
         logout();
         throw err;
      }
   }, []);

   const login = async (username: string, password: string) => {
      try {
      } catch (err) {
         console.error("Login failed: ", err);
         throw err;
      }
   };

   const logout = () => {
      setIsAuth(false);
      setAccessToken(null);
      setRole(UserRoles.user);
      localStorage.removeItem("ACCESS_TOKEN");
      // remove the refresh token aswell here.
   };

   const contextValue = useMemo(
      () => ({
         accessToken,
         isAuth,
         role,
         loading,
         login,
         logout,
      }),
      [accessToken, isAuth, role, loading, login, logout],
   );

   return (
      <>
         <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
      </>
   );
}
