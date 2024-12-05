export const getEnvVar = (key: string) => {
   if (import.meta.env[key] === undefined) {
      throw new Error(`Env variable ${key} is required`);
   }
   return import.meta.env[key] || "";
};

export const SUPABASE_URL: string = getEnvVar("VITE_SUPABASE_URL");
export const SUPABASE_PUBLIC_ANON_KEY: string = getEnvVar(
   "VITE_SUPABASE_PUBLIC_ANON_KEY",
);
export const ENV_TEST: string = getEnvVar("VITE_ENV_TEST");
