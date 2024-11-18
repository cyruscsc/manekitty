import { Database } from './database.types'

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type AccountUpdate = Database['public']['Tables']['accounts']['Update']

export type AccountCreate = Database['public']['Tables']['accounts']['Insert']