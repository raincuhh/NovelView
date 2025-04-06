import { User } from "@/shared/lib/types";
import { Session } from "@supabase/supabase-js";

export const isValidEmail = (email: string): boolean => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isStrongPassword = (password: string): boolean => {
	return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

export const formatAuthError = (error: any): string => {
	if (!error) return "An unknown error occurred.";
	if (error.message) return error.message;
	return "Authentication failed. Please try again.";
};

export const extractUserInfo = (session: Session) => {
	if (!session?.user) return null;

	const { id, email } = session.user;
	return { id, email };
};

export const isAdmin = (user: User) => {
	return user.role === "admin";
};
export const sanitizeInput = (input: string): string => {
	return input.replace(/[<>]/g, "");
};

export const isAuthenticated = (session: Session | null): boolean => {
	return !!session?.user;
};

export const getUserInitials = (name: string): string => {
	if (!name) return "";
	const parts = name.split(" ");
	return parts.map((part) => part[0].toUpperCase()).join("");
};
