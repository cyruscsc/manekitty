import { supabaseBrowser } from '../../supabase/browser'

export const getAccounts = async (id: string) => {
  const supabase = supabaseBrowser()
  const { data: account, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('id', id)
  if (error) throw error
  return account
}
