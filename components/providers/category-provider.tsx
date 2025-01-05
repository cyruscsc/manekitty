import { CategoryContext } from '@/contexts/category-context'
import { Category } from '@/lib/types/tables.types'
import { ReactNode } from 'react'

interface CategoryProviderProps {
  category: Category
  children: ReactNode
}

export const CategoryProvider = ({
  category,
  children,
}: CategoryProviderProps) => {
  return (
    <CategoryContext.Provider value={{ category }}>
      {children}
    </CategoryContext.Provider>
  )
}
