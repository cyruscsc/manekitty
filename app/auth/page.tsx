'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { routes } from '@/config/routes'
import { supabaseBrowser } from '@/lib/supabase/browser'

import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const page = () => {
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
    <div className='flex items-center justify-center w-full h-screen'>
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
    </div>
  )
}

export default page
