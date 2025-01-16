import { supabaseBrowser } from '@/lib/supabase/browser'

export const deleteTransaction = async (id: string) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('transactions').delete().eq('id', id)
  if (error) throw error
}
