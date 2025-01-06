import { getAllCategories } from '@/lib/actions/category/get-all-categories'
import { getCategory } from '@/lib/actions/category/get-category'
import { updateCategory } from '@/lib/actions/category/update-category'
import { updateSubcategory } from '@/lib/actions/category/update-subcategory'
import { CategoryUpdate, Subcategory } from '@/lib/types/tables.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface updateCategoryProps {
  id: string
  category: CategoryUpdate
}

const updateCategoryAndItsChildrenIfNeeded = async ({
  id,
  category,
}: updateCategoryProps) => {
  const originalCategory = await getCategory({ id })
  await updateCategory({ id, category })
  if (originalCategory.color === category.color) return
  const allCategories = await getAllCategories()
  if (!allCategories || allCategories.length === 0) return
  const subcategories = allCategories.filter(
    (x) => x.parent_id === id
  ) as Subcategory[]
  await Promise.all(
    subcategories.map((subcategory) => {
      return updateSubcategory({
        id: subcategory.id,
        subcategory: { ...subcategory, color: category.color },
      })
    })
  )
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateCategoryAndItsChildrenIfNeeded,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
