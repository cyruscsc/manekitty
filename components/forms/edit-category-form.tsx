'use client'

import { colors } from '@/config/colors'
import { useCurrentCategory } from '@/hooks/category/current-category'
import { Category, CategoryUpdate, Profile } from '@/lib/types/tables.types'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useGetProfile } from '@/hooks/profile/get-profile'
import { useUpdateCategory } from '@/hooks/category/update-category'
import { useToast } from '@/hooks/ui/use-toast'
import { Save } from 'lucide-react'
import { useDeleteCategory } from '@/hooks/category/delete-category'
import { DeleteModal } from '../modals/delete-modal'

const formSchema = z.object({
  userId: z.string(),
  parentId: z.null(),
  color: z.enum(Object.keys(colors) as unknown as [string, ...string[]]),
  name: z.string().min(2).max(16),
})

interface HookFormProps {
  profile: Profile
  category: Category
  updateCategory: (params: {
    id: string
    category: CategoryUpdate
  }) => Promise<void>
  isPendingUpdate: boolean
  deleteCategory: (id: string) => Promise<void>
  isPendingDelete: boolean
  toast: ReturnType<typeof useToast>['toast']
}

export const HookForm = ({
  profile,
  category,
  updateCategory,
  isPendingUpdate,
  deleteCategory,
  isPendingDelete,
  toast,
}: HookFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: profile.id as string,
      parentId: category.parent_id,
      color: category.color,
      name: category.name,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateCategory({
        id: category.id,
        category: {
          user_id: data.userId,
          parent_id: data.parentId,
          color: data.color,
          name: data.name,
        },
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to update category',
      })
      console.error(error)
    }
    toast({
      description: 'Category updated successfully',
    })
  }

  const onDelete = async () => {
    try {
      await deleteCategory(category.id)
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to delete category',
      })
      console.error(error)
    }
    toast({
      description: 'Category deleted successfully',
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
                <Input placeholder='Category name' {...field} />
              </FormControl>
              <FormDescription>2-16 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='color'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a color' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(colors).map((color) => (
                    <SelectItem key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            title={`Are you sure to delete ${category.name}?`}
            description={`This action cannot be undone. This will permanently delete ${category.name} and all its transactions.`}
            onDelete={onDelete}
            isPending={isPendingDelete}
          />
        </div>
      </form>
    </Form>
  )
}

export const EditCategoryForm = () => {
  const { data: profile } = useGetProfile()
  const { category } = useCurrentCategory()
  const { mutateAsync: updateCategory, isPending: isPendingUpdate } =
    useUpdateCategory()
  const { mutateAsync: deleteCategory, isPending: isPendingDelete } =
    useDeleteCategory()
  const { toast } = useToast()

  if (!profile || !category) {
    return <div>Loading...</div>
  }

  return (
    <HookForm
      profile={profile}
      category={category}
      updateCategory={updateCategory}
      isPendingUpdate={isPendingUpdate}
      deleteCategory={deleteCategory}
      isPendingDelete={isPendingDelete}
      toast={toast}
    />
  )
}
