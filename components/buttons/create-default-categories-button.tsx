'use client'

import { useCreateDefaultCategories } from '@/hooks/category/create-default-categories'
import { Button } from '../ui/button'
import { useGetProfile } from '@/hooks/profile/get-profile'
import { ButtonSkeleton } from '../skeletons/button-skeleton'

export const CreateDefaultCategoriesButton = () => {
  const { data: profile } = useGetProfile()
  const { mutateAsync: createDefaultCategories, isPending } =
    useCreateDefaultCategories()

  if (!profile) return <ButtonSkeleton />

  return (
    <Button
      disabled={isPending}
      onClick={() => createDefaultCategories(profile.id)}
    >
      Create default categories
    </Button>
  )
}
