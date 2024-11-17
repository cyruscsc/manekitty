import { supabaseBrowser } from '../../supabase/browser'

export const getAccounts = async () => {
  const supabase = supabaseBrowser()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data: accounts, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', user.id)
  if (error) throw error
  return accounts
}
