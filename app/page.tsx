'use client'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'
import { useUser } from '@/hooks/user'
import { redirect } from 'next/navigation'

const page = () => {
  const { isFetching, data } = useUser()
  return (
    <div className='h-[3000px]'>
      <ThemeToggle />
      {data ? (
        <Button
          variant='outline'
          onClick={() => redirect(routes.dashboard.href)}
        >
          Dashboard
        </Button>
      ) : (
        <Button variant='outline' onClick={() => redirect(routes.auth.href)}>
          Sign in
        </Button>
      )}
    </div>
  )
}

export default page
