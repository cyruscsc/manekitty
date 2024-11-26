import { createDefaultCategories } from '@/lib/actions/category/create-default-categories'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateDefaultCategories = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createDefaultCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
