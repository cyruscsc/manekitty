import { colors } from '@/config/colors'
import { Database } from './database.types'

export type Theme = Database['public']['Enums']['theme']

export type Currency = Database['public']['Enums']['currency']

export type AccountType = Database['public']['Enums']['account_type']

export type Color = keyof typeof colors

export type TransactionType = Database['public']['Enums']['transaction_type']
