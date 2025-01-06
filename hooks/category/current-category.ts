import { CategoryContext } from '@/contexts/category-context'
import { useContext } from 'react'

export const useCurrentCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCurrentCategory must be used within an CategoryProvider')
  }
  return context
}
