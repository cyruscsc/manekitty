import { getProfile } from '@/lib/actions/profile/get-profile'
import { useQuery } from '@tanstack/react-query'

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
}
