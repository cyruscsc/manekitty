import { supabaseBrowser } from '@/lib/supabase/browser'
import { AccountUpdate } from '@/lib/types/tables.types'

interface updateAccountProps {
  id: string
  account: AccountUpdate
}

export const updateAccount = async ({ id, account }: updateAccountProps) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('accounts').update(account).eq('id', id)
  if (error) throw error
}
