import { supabaseBrowser } from '@/lib/supabase/browser'

export const getCategories = async () => {
  const supabase = supabaseBrowser()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', user.id)
  if (error) throw error
  return categories
}
