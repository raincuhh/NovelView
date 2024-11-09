import { UserRoles } from "../../../shared/lib/types";

export type AuthContextProps = {
   jwt_token: string | null;
   is_authenticated: boolean;
   role: UserRoles;
   login: (
      username: string,
      password: string
   ) => Promise<void>;
   logout: () => void;
   loading: boolean;
};

export type AuthInputType =
   | "username"
   | "email"
   | "password";
