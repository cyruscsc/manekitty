import { supabaseBrowser } from '@/lib/supabase/browser'
import { TransactionUpdate } from '@/lib/types/tables.types'

interface updateTransactionProps {
  id: string
  transaction: TransactionUpdate
}

export const updateTransaction = async ({
  id,
  transaction,
}: updateTransactionProps) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase
    .from('transactions')
    .update(transaction)
    .eq('id', id)
  if (error) throw error
}
