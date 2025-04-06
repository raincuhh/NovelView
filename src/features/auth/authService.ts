import { supabase } from "@/shared/lib/services";
import { UserRoles } from "@/shared/lib/types";

export const registerUser = async (email: string, password: string, username: string) => {
	try {
		const { data, error } = await supabase.auth.signUp({ email, password });
		if (error) throw error;

		if (data.user) {
			await supabase.from("profiles").insert({
				user_id: data.user.id,
				username,
				role: UserRoles.user,
			});

			return {
				...data.user,
				user_id: data.user.id,
				username,
				role: UserRoles.user,
			};
		}
		return null;
	} catch (err: any) {
		console.error("Error registering user:", err);
		throw err;
	}
};

export const loginUser = async (email: string, password: string) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) throw error;

		if (data.session) {
			const { data: profile, error: profileError } = await supabase
				.from("profiles")
				.select("*")
				.eq("user_id", data.session.user.id)
				.single();

			if (profileError) throw profileError;

			return {
				session: data.session,
				user: {
					...data.session.user,
					...profile,
				},
			};
		}
		return null;
	} catch (err: any) {
		console.error("Error during login:", err);
		throw err;
	}
};

export const logoutUser = async () => {
	await supabase.auth.signOut();
};
