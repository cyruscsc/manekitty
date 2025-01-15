import { updateTransaction } from '@/lib/actions/transaction/update-transaction'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
