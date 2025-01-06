import { supabaseBrowser } from "@/lib/supabase/browser"
import { SubcategoryUpdate } from "@/lib/types/tables.types"

interface updateSubcategoryProps {
  id: string
  subcategory: SubcategoryUpdate
}

export const updateSubcategory = async ({ id, subcategory }: updateSubcategoryProps) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('categories').update(subcategory).eq('id', id)
  if (error) throw error
}
