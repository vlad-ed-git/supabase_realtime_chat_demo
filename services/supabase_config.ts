import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if(!url || !key){
    throw new Error('Missing environmental variables!')
}
const supabase = createClient(url, key)
export default supabase