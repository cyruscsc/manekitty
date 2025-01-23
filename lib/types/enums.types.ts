import { colors } from '@/config/colors'
import { Database } from './database.types'

export type Theme = Database['public']['Enums']['theme']

export type AccountType = Database['public']['Enums']['account_type']

export type Color = keyof typeof colors
