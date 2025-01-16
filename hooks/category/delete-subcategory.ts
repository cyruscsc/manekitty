import { deleteSubcategory } from "@/lib/actions/category/delete-subcategory"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteSubcategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}