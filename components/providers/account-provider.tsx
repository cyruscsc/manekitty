import { AccountContext } from '@/contexts/account-context'
import { Account } from '@/lib/types/tables.types'
import { ReactNode } from 'react'

interface AccountProviderProps {
  account: Account
  children: ReactNode
}

export const AccountProvider = ({
  account,
  children,
}: AccountProviderProps) => {
  return (
    <AccountContext.Provider value={{ account }}>
      {children}
    </AccountContext.Provider>
  )
}
