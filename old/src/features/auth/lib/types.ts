import { UserRoles } from "../../../shared/lib/types";

export type AuthContextProps = {
   jwtToken: string | null;
   isAuthenticated: boolean;
   role: UserRoles;
   login: (username: string, password: string) => Promise<void>;
   logout: () => void;
   loading: boolean;
};

export type AuthInputType = "username" | "email" | "password";
