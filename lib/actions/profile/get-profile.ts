import { supabaseBrowser } from '../../supabase/browser'

export const getProfile = async () => {
  const supabase = supabaseBrowser()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  if (error) throw error
  return profile
}
