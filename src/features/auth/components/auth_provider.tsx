import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../lib/hooks";
import { UserRoles } from "../../../shared/lib/types";

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
   const [jwt_token, set_jwt_token] = useState(
      localStorage.getItem("jwt_token")
   );
   const [is_authenticated, set_is_authenticated] = useState(false);
   const [role, set_role] = useState(UserRoles.guest);
   const [loading, set_loading] = useState(false);

   useEffect(() => {}, [jwt_token]);

   const login = async (username: string, password: string) => {
      set_loading(true);
      try {
      } catch (err) {
      } finally {
         set_loading(false);
      }
   };

   const logout = async () => {
      set_is_authenticated(false);
   };

   const handle_jwt_token = async (jwt_token: string) => {
      set_loading(true);
      try {
      } catch (err) {
      } finally {
         set_loading(false);
      }
   };

   return (
      <AuthContext.Provider
         value={{ jwt_token, is_authenticated, role, loading, login, logout }}
      >
         {children}
      </AuthContext.Provider>
   );
}
