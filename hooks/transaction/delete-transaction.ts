import { deleteTransaction } from '@/lib/actions/transaction/delete-transaction'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
