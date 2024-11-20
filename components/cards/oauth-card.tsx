'use client'

import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { routes } from '@/config/routes'

export const OAuthCard = () => {
  const handleOAuthSignIn = async () => {
    const supabase = supabaseBrowser()
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo:
          location.origin + '/auth/callback?next=' + routes.dashboard.href,
      },
    })
  }

  return (
    <Card className='w-80'>
      <CardHeader>
        <CardTitle>Welcome to Manekitty</CardTitle>
        <CardDescription>Sign up or sign in to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant='outline'
          className='w-full'
          onClick={handleOAuthSignIn}
        >
          <FcGoogle />
          Google
        </Button>
      </CardContent>
    </Card>
  )
}
