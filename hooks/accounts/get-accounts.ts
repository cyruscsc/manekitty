import { getAccounts } from '@/lib/actions/accounts/get-accounts'
import { useQuery } from '@tanstack/react-query'

export const useGetAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  })
}
