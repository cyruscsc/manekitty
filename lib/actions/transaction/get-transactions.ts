import { supabaseBrowser } from '@/lib/supabase/browser'

export const getTransactions = async (startDate: string, endDate: string) => {
  const supabase = supabaseBrowser()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*, account:accounts(*), category:categories(*)')
    .gte('date', startDate)
    .lte('date', endDate)
  if (error) throw error
  return transactions
}
