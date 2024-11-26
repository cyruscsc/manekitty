import { AccountContext } from '@/contexts/account-context'
import { useContext } from 'react'

export const useCurrentAccount = () => {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useCurrentAccount must be used within an AccountProvider')
  }
  return context
}
