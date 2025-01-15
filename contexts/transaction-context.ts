import { Transaction } from '@/lib/types/tables.types'
import { createContext } from 'react'

export const TransactionContext = createContext({
  transaction: {} as Transaction,
})
