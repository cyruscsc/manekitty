import { ReactNode } from 'react'

export const DashboardWrapper = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return <div className='mt-[62px]'>{children}</div>
}
