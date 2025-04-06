import { User } from "@/shared/lib/types";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "@/shared/lib/services";
import { logoutUser, registerUser, loginUser } from "./authService";

type AuthState = {
	user: User | null;
	session: Session | null;
	loading: boolean;
	register: (email: string, password: string, username: string) => Promise<User | null>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	setUser: (user: User | null) => void;
	setSession: (session: Session | null) => void;
	setLoading: (loading: boolean) => void;
	initAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	session: null,
	loading: false,

	setUser: (user) => set({ user }),
	setSession: (session) => set({ session }),
	setLoading: (loading) => set({ loading }),

	register: async (email, password, username) => {
		const user = await registerUser(email, password, username);
		set({ user });
		return user;
	},

	login: async (email, password) => {
		const authData = await loginUser(email, password);
		if (authData) {
			set({ session: authData.session, user: authData.user });
		}
	},

	logout: async () => {
		await logoutUser();
		set({ user: null, session: null });
	},

	initAuth: () => {
		console.log("initializing auth...");
		const fetchUser = async (session: Session | null) => {
			set({ loading: true });

			if (!session?.user) {
				set({ user: null, session: null, loading: false });
				return;
			}

			const { data, error } = await supabase
				.from("profiles")
				.select("*")
				.eq("user_id", session.user.id)
				.single();

			if (error) {
				console.error("Error fetching user: ", error);
				set({ loading: false });
				return;
			}

			set({ user: data, session, loading: false });
		};

		supabase.auth.getSession().then(({ data }) => {
			fetchUser(data.session);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
			fetchUser(session);
		});

		return () => {
			authListener?.subscription?.unsubscribe();
		};
	},
}));
