import { supabaseBrowser } from '@/lib/supabase/browser'
import { TransactionCreate } from '@/lib/types/tables.types'

export const createTransaction = async (transaction: TransactionCreate) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('transactions').insert(transaction)
  if (error) throw error
}
