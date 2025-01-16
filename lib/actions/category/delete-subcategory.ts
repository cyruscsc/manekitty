import { supabaseBrowser } from '@/lib/supabase/browser'

export const deleteSubcategory = async (id: string) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw error
}
