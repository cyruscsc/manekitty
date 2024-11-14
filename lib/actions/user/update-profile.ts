import { supabaseBrowser } from '@/lib/supabase/browser'
import { ProfileUpdate } from '@/lib/types/tables.types'

export const updateProfile = async (profile: ProfileUpdate) => {
  const supabase = supabaseBrowser()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  await supabase.from('profiles').update(profile).eq('id', user.id)
}
