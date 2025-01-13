import { createTransaction } from '@/lib/actions/transaction/create-transaction'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
