import { supabaseBrowser } from '@/lib/supabase/browser'
import { CategoryUpdate } from '@/lib/types/tables.types'

interface updateCategoryProps {
  id: string
  category: CategoryUpdate
}

export const updateCategory = async ({ id, category }: updateCategoryProps) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('categories').update(category).eq('id', id)
  if (error) throw error
}
