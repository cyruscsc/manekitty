'use client'

import { DashboardButton } from '@/components/buttons/dashboard-button'
import { SignInButton } from '@/components/buttons/sign-in-button'
import { ButtonSkeleton } from '@/components/skeletons/button-skeleton'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useUser } from '@/hooks/user'

const page = () => {
  const { isFetching, data } = useUser()
  return (
    <div className='h-[3000px]'>
      <div className='flex'>
        <ThemeToggle />
        {isFetching ? (
          <ButtonSkeleton />
        ) : data ? (
          <DashboardButton />
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  )
}

export default page
