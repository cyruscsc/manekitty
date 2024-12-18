import { createAccount } from '@/lib/actions/account/create-account'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}
