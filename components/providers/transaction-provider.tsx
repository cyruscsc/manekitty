import { TransactionContext } from '@/contexts/transaction-context'
import { Transaction } from '@/lib/types/tables.types'
import { ReactNode } from 'react'

interface TransactionProviderProps {
  transaction: Transaction
  children: ReactNode
}

export const TransactionProvider = ({
  transaction,
  children,
}: TransactionProviderProps) => {
  return (
    <TransactionContext.Provider value={{ transaction }}>
      {children}
    </TransactionContext.Provider>
  )
}
