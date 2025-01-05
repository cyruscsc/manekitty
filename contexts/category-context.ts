import { Category } from '@/lib/types/tables.types'
import { createContext } from 'react'

export const CategoryContext = createContext({ category: {} as Category })
