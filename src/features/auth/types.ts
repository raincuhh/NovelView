import { DateOfBirth, GenderType } from "@/shared/lib/types";
import { User as SupabaseUser } from "@supabase/supabase-js";

export type Profile = {
	user_id?: string;
	username?: string;
	gender?: GenderType;
	dob?: DateOfBirth;
	created_at?: string;
	updated_at?: string;
	avatar_url?: string;
};

export type User = {
	auth: SupabaseUser;
	profile: Profile;
};
