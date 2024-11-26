import { supabaseBrowser } from '@/lib/supabase/browser'
import { AccountCreate } from '@/lib/types/tables.types'

export const createAccount = async (account: AccountCreate) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('accounts').insert(account)
  if (error) throw error
}
