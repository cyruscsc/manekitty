import { Database } from './database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Account = Database['public']['Tables']['accounts']['Row']

export type AccountCreate = Database['public']['Tables']['accounts']['Insert']

export type AccountUpdate = Database['public']['Tables']['accounts']['Update']

export type CategoryGeneric = Database['public']['Tables']['categories']['Row']

export type Category = Omit<
  Database['public']['Tables']['categories']['Row'],
  'parent_id'
> & { parent_id: null }

export type CategoryCreate = Omit<
  Database['public']['Tables']['categories']['Insert'],
  'parent_id'
> & { parent_id: null }

export type CategoryUpdate = Omit<
  Database['public']['Tables']['categories']['Update'],
  'parent_id'
> & { parent_id: null }

export type Subcategory = Omit<
  Database['public']['Tables']['categories']['Row'],
  'parent_id'
> & { parent_id: string }

export type SubcategoryCreate = Omit<
  Database['public']['Tables']['categories']['Insert'],
  'parent_id'
> & { parent_id: string }

export type SubcategoryUpdate = Omit<
  Database['public']['Tables']['categories']['Update'],
  'parent_id'
> & { parent_id: string }

export type Transaction = Database['public']['Tables']['transactions']['Row']

export type TransactionCreate =
  Database['public']['Tables']['transactions']['Insert']
