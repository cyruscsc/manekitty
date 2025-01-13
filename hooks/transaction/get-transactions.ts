import { getTransactions } from '@/lib/actions/transaction/get-transactions'
import { useQuery } from '@tanstack/react-query'

export const useGetTransactions = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['transactions', startDate, endDate],
    queryFn: () => getTransactions(startDate, endDate),
  })
}
