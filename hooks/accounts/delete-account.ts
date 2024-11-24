import { deleteAccount } from '@/lib/actions/accounts/delete-account'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}
