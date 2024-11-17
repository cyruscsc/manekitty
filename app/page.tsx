'use client'

import { DashboardButton } from '@/components/buttons/dashboard-button'
import { SignInButton } from '@/components/buttons/sign-in-button'
import { ButtonSkeleton } from '@/components/skeletons/button-skeleton'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useGetProfile } from '@/hooks/profile/get-profile'

const page = () => {
  const { data: profile, isFetching } = useGetProfile()
  return (
    <div className='h-[3000px]'>
      <div className='flex'>
        <ThemeToggle />
        {isFetching ? (
          <ButtonSkeleton />
        ) : profile ? (
          <DashboardButton />
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  )
}

export default page
