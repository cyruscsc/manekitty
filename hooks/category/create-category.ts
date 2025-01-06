import { createCategory } from '@/lib/actions/category/create-category'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
