import { SubcategoryContext } from "@/contexts/subcategory-context"
import { useContext } from "react"

export const useCurrentSubcategory = () => {
  const context = useContext(SubcategoryContext)
  if (!context) {
    throw new Error('useCurrentSubcategory must be used within an SubcategoryProvider')
  }
  return context
}
