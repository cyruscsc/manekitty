'use client'

import { supabaseBrowser } from '@/lib/supabase/browser'
import { Button } from '../ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { routes } from '@/config/routes'

export const SignOutButton = () => {
  const queryClient = useQueryClient()
  const handleSignOut = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signOut()
    queryClient.clear()
    redirect(routes.home.href)
  }
  return (
    <Button variant='outline' onClick={handleSignOut}>
      Sign out
    </Button>
  )
}
