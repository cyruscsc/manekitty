import React from 'react'
import { NavMenu } from '@/components/nav/nav-menu'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <NavMenu />
      {children}
    </>
  )
}

export default layout
