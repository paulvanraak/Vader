import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !anonKey) {
  throw new Error('VITE_SUPABASE_URL en VITE_SUPABASE_ANON_KEY moeten gezet zijn in .env')
}

export const supabase = createClient(url, anonKey, {
  auth: {
    // De sessie moet een testperiode van vier weken overbruggen zonder dat
    // iemand opnieuw hoeft in te loggen; de refresh token wordt stil vernieuwd.
    persistSession: true,
    autoRefreshToken: true,
    // Vangt de magic link uit dezelfde mail op via /auth/callback.
    detectSessionInUrl: true,
  },
})
