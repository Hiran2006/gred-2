import { Database } from "@/database.types"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!
if (!supabaseUrl) console.warn("missing .env SUPABASE_URL")
if (!supabaseKey) console.warn("missing .env SUPABASE_KEY")
export default createClient<Database>(supabaseUrl, supabaseKey)
