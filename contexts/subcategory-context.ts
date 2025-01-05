import { Subcategory } from '@/lib/types/tables.types'
import { createContext } from 'react'

export const SubcategoryContext = createContext({
  subcategory: {} as Subcategory,
})
