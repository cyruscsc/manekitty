import { SubcategoryContext } from '@/contexts/subcategory-context'
import { Subcategory } from '@/lib/types/tables.types'
import { ReactNode } from 'react'

interface SubcategoryProviderProps {
  subcategory: Subcategory
  children: ReactNode
}

export const SubcategoryProvider = ({
  subcategory,
  children,
}: SubcategoryProviderProps) => {
  return (
    <SubcategoryContext.Provider value={{ subcategory }}>
      {children}
    </SubcategoryContext.Provider>
  )
}
