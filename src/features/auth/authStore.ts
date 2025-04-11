import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { create } from "zustand";
import { db, supabase } from "@/shared/providers/systemProvider";
import { Profile, User } from "./types";

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
		set({ loading: true });
		try {
			if (!supabase) throw new Error("Supabase not initialized yet");

			const session = await supabase.getSession();
			if (session) {
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

		const baseUser = session.user;
		const profile = await db.getOptional<Profile>(
			"SELECT user_id, username, gender, dob FROM profiles WHERE user_id = ?",
			[baseUser.id]
		);

		if (profile) {
			set({
				user: {
					auth: baseUser,
					profile: profile,
				},
				loading: false,
			});
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
