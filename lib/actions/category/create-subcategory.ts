import { supabaseBrowser } from '@/lib/supabase/browser'
import { SubcategoryCreate } from '@/lib/types/tables.types'

export const createSubcategory = async (subcategory: SubcategoryCreate) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('categories').insert(subcategory)
  if (error) throw error
}
