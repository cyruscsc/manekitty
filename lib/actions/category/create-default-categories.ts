import {
  defaultChildCategories,
  defaultParentCategories,
} from '@/config/categories'
import { supabaseBrowser } from '@/lib/supabase/browser'

export const createDefaultCategories = async (user_id: string) => {
  const supabase = supabaseBrowser()

  const { data, error: parentError } = await supabase
    .from('categories')
    .insert(defaultParentCategories.map((x) => ({ user_id, ...x })))
    .select()
  if (parentError) throw parentError

  const parents: { [key: string]: { color: string; id: string } } = {}
  for (const p of data) {
    parents[p.name] = { color: p.color, id: p.id }
  }

  const { error: childError } = await supabase.from('categories').insert(
    defaultChildCategories.map((x) => ({
      user_id,
      color: parents[x.parent].color,
      name: x.name,
      parent_id: parents[x.parent].id,
    }))
  )
  if (childError) throw childError
}
