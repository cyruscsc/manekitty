import { updateAccount } from '@/lib/actions/account/update-account'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}
