import { configDotenv } from "dotenv";
import { createClient } from "@supabase/supabase-js";

configDotenv();

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
   throw new Error("Supabase URL or Anon Key is missing");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
