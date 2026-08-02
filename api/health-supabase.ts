import { createClient } from '@supabase/supabase-js'

export default function handler(req: any, res: any) {
  res.status(200).json({ ok: true, loaded: typeof createClient })
}
