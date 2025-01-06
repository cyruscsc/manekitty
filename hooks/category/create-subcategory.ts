import { createSubcategory } from '@/lib/actions/category/create-subcategory'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateSubcategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
