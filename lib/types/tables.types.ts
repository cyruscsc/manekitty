import { Database } from './database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Account = Database['public']['Tables']['accounts']['Row']

export type AccountCreate = Database['public']['Tables']['accounts']['Insert']

export type AccountUpdate = Database['public']['Tables']['accounts']['Update']
