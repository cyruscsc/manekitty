import { Account } from '@/lib/types/tables.types'
import { createContext } from 'react'

export const AccountContext = createContext({ account: {} as Account })
