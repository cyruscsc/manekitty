import { TransactionContext } from '@/contexts/transaction-context'
import { useContext } from 'react'

export const useCurrentTransaction = () => {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error(
      'useCurrentTransaction must be used within a TransactionProvider'
    )
  }
  return context
}
