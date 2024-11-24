import { supabaseBrowser } from '@/lib/supabase/browser'

export const deleteAccount = async (id: string) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('accounts').delete().eq('id', id)
  if (error) throw error
}
