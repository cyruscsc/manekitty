'use client'

import { colors } from '@/config/colors'
import { useCurrentSubcategory } from '@/hooks/category/current-subcategory'
import {
  Profile,
  Subcategory,
  SubcategoryUpdate,
} from '@/lib/types/tables.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useGetProfile } from '@/hooks/profile/get-profile'
import { useUpdateSubcategory } from '@/hooks/category/update-subcategory'
import { useToast } from '@/hooks/ui/use-toast'
import { Save } from 'lucide-react'
import { useDeleteSubcategory } from '@/hooks/category/delete-subcategory'
import { DeleteModal } from '../modals/delete-modal'

const formSchema = z.object({
  userId: z.string(),
  parentId: z.string(),
  color: z.enum(Object.keys(colors) as unknown as [string, ...string[]]),
  name: z.string().min(2).max(16),
})

interface HookFormProps {
  profile: Profile
  subcategory: Subcategory
  updateSubcategory: (params: {
    id: string
    subcategory: SubcategoryUpdate
  }) => Promise<void>
  isPendingUpdate: boolean
  deleteSubcategory: (id: string) => Promise<void>
  isPendingDelete: boolean
  toast: ReturnType<typeof useToast>['toast']
}

export const HookForm = ({
  profile,
  subcategory,
  updateSubcategory,
  isPendingUpdate,
  deleteSubcategory,
  isPendingDelete,
  toast,
}: HookFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: profile.id as string,
      parentId: subcategory.parent_id,
      color: subcategory.color,
      name: subcategory.name,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateSubcategory({
        id: subcategory.id,
        subcategory: {
          user_id: data.userId,
          parent_id: data.parentId,
          color: data.color,
          name: data.name,
        },
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to update subcategory',
      })
      console.error(error)
    }
    toast({
      description: 'Subcategory updated successfully',
    })
  }

  const onDelete = async () => {
    try {
      await deleteSubcategory(subcategory.id)
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to delete subcategory',
      })
      console.error(error)
    }
    toast({
      description: 'Subcategory deleted successfully',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Subcategory name' {...field} />
              </FormControl>
              <FormDescription>2-16 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-2'>
          <Button
            type='submit'
            size='icon'
            disabled={isPendingUpdate}
            className='flex-1'
          >
            <Save />
          </Button>
          <DeleteModal
            title={`Are you sure to delete ${subcategory.name}?`}
            description={`This action cannot be undone. This will permanently delete ${subcategory.name} and all its transactions.`}
            onDelete={onDelete}
            isPending={isPendingDelete}
          />
        </div>
      </form>
    </Form>
  )
}

export const EditSubcategoryForm = () => {
  const { data: profile } = useGetProfile()
  const { subcategory } = useCurrentSubcategory()
  const { mutateAsync: updateSubcategory, isPending: isPendingUpdate } =
    useUpdateSubcategory()
  const { mutateAsync: deleteSubcategory, isPending: isPendingDelete } =
    useDeleteSubcategory()
  const { toast } = useToast()

  if (!profile || !subcategory) {
    return <div>Loading...</div>
  }

  return (
    <HookForm
      profile={profile}
      subcategory={subcategory}
      updateSubcategory={updateSubcategory}
      isPendingUpdate={isPendingUpdate}
      deleteSubcategory={deleteSubcategory}
      isPendingDelete={isPendingDelete}
      toast={toast}
    />
  )
}
