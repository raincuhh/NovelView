import { Provider, Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { powersyncDb, supabase } from "@/shared/providers/systemProvider";
import { UserProfile, User, AuthUser } from "../user/types";

type AuthStoreState = {
	session: Session | null;
	user: User | null;
	loading: boolean;
	setSession: (session: Session | null) => void;
	init: () => Promise<void>;
	refreshUser: () => Promise<void>;
	signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthStoreState>((set, get) => ({
	user: null,
	session: null,
	loading: true,

	setSession: (session) => {
		set({ session });

		if (session) {
			get().refreshUser();
		} else {
			set({ user: null });
		}
	},

	init: async () => {
		console.log("authStore init");
		set({ loading: true });

		supabase.client.auth.onAuthStateChange((_event, session) => {
			console.log("Auth event:", _event);
			get().setSession(session);
		});

		try {
			if (!supabase) throw new Error("Supabase not initialized yet");

			const session = await supabase.getSession();
			if (session) {
				console.log("refreshing user");
				set({ session });
				await get().refreshUser();
			}
		} finally {
			set({ loading: false });
		}
	},

	refreshUser: async () => {
		const session = get().session;

		if (!session) {
			set({ user: null });
			return;
		}

		const sessionUser = session.user;
		const baseUser: AuthUser = {
			userId: sessionUser.id,
			email: sessionUser.email,
			provider: sessionUser.app_metadata?.provider as Provider,
			accessToken: session.access_token,
			refreshToken: session.refresh_token,
		};

		const profile = await powersyncDb.getOptional<UserProfile>(
			"SELECT user_id, username, gender, dob FROM profiles WHERE user_id = ?",
			[baseUser.userId]
		);

		if (profile) {
			set({
				user: {
					auth: baseUser,
					profile: profile,
				},
				loading: false,
			});

			console.log("user: ", get().user);
			console.log("session", get().session);
		} else {
			set({ user: null, loading: false });
		}
	},

	signOut: async () => {
		if (supabase) await supabase.signOut();

		set({
			session: null,
			user: null,
		});
	},
}));
