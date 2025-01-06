import { supabaseBrowser } from '@/lib/supabase/browser'
import { CategoryCreate } from '@/lib/types/tables.types'

export const createCategory = async (category: CategoryCreate) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('categories').insert(category)
  if (error) throw error
}
