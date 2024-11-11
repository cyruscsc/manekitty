import React from 'react'
import { NavMenu } from '@/components/nav/nav-menu'
import { DashboardWrapper } from '@/components/wrappers/dashboard-wrapper'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <NavMenu />
      <DashboardWrapper>{children}</DashboardWrapper>
    </>
  )
}

export default layout
