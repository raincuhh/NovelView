import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { invoke } from "@tauri-apps/api/core";

const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseInstance = (): SupabaseClient<any, "public", any> => {
   if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Supabase URL or Anon Key is missing");
   }

   return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

export const invokeTauri = (cmd: string, args: Record<string, any>) => {
   return invoke(cmd, args);
};