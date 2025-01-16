import { deleteCategory } from "@/lib/actions/category/delete-category"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}