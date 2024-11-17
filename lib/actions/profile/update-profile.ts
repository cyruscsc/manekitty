import { supabaseBrowser } from '@/lib/supabase/browser'
import { ProfileUpdate } from '@/lib/types/tables.types'

interface updateProfileProps {
  id: string
  profile: ProfileUpdate
}

export const updateProfile = async ({ id, profile }: updateProfileProps) => {
  const supabase = supabaseBrowser()
  const { error } = await supabase.from('profiles').update(profile).eq('id', id)
  if (error) throw error
}
