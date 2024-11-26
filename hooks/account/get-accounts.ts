import { getAccounts } from '@/lib/actions/account/get-accounts'
import { useQuery } from '@tanstack/react-query'

export const useGetAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
  })
}
