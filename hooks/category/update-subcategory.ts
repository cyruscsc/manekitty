import { updateSubcategory } from '@/lib/actions/category/update-subcategory'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateSubcategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
