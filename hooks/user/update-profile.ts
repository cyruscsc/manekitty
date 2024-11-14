import { updateProfile } from '@/lib/actions/user/update-profile'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}
