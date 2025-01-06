import { supabaseBrowser } from "@/lib/supabase/browser"

interface getCategoryProps {
  id: string
}

export const getCategory = async ({ id }: getCategoryProps) => {
  const supabase = supabaseBrowser()
  const { data: category, error } = await supabase.from('categories').select('*').eq('id', id).single()
  if (error) throw error
  return category
}
