import { configDotenv } from "dotenv";
import { createClient } from "@supabase/supabase-js";

configDotenv();

const SUPABASE_URL: string | undefined = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY: string | undefined =
   process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
   throw new Error("Supabase URL or Anon Key is missing");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
