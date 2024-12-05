import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { invoke, InvokeArgs, InvokeOptions } from "@tauri-apps/api/core";
import { SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY } from "./env";

export const supabaseInstance = (): SupabaseClient<any, "public", any> => {
   if (!SUPABASE_URL || !SUPABASE_PUBLIC_ANON_KEY) {
      throw new Error("Supabase URL or Anon Key is missing");
   }

   return createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY);
};

export const invokeTauri = (cmd: string, args?: InvokeArgs, options?: InvokeOptions) => {
   return invoke(cmd, args, options);
};
