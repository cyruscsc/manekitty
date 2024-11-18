import { colors } from '@/config/enums'
import { Database } from './database.types'

export type Theme = Database['public']['Enums']['theme']

export type Currency = Database['public']['Enums']['currency']

export type AccountType = Database['public']['Enums']['account_type']

export type Color = (typeof colors)[number]
