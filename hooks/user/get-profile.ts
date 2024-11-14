import { getProfile } from '@/lib/actions/user/get-profile'
import { useQuery } from '@tanstack/react-query'

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
}
