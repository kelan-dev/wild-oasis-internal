import { createClient } from "@supabase/supabase-js";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabaseUrl = "https://vjlnlhewntpvamowaicu.supabase.co";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
