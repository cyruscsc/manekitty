'use client'

import { colors } from '@/config/colors'
import { Category, Profile, SubcategoryCreate } from '@/lib/types/tables.types'
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
import { useCurrentCategory } from '@/hooks/category/current-category'
import { useCreateSubcategory } from '@/hooks/category/create-subcategory'
import { useToast } from '@/hooks/ui/use-toast'
import { Save } from 'lucide-react'

const formSchema = z.object({
  userId: z.string(),
  parentId: z.string(),
  color: z.enum(Object.keys(colors) as unknown as [string, ...string[]]),
  name: z.string().min(2).max(16),
})

interface HookFormProps {
  profile: Profile
  category: Category
  createSubcategory: (data: SubcategoryCreate) => Promise<void>
  isPending: boolean
  toast: ReturnType<typeof useToast>['toast']
}

export const HookForm = ({
  profile,
  category,
  createSubcategory,
  isPending,
  toast,
}: HookFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: profile.id as string,
      parentId: category.id,
      color: category.color,
      name: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createSubcategory({
        user_id: data.userId,
        parent_id: data.parentId,
        color: data.color,
        name: data.name,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to create subcategory',
      })
      console.error(error)
    }
    toast({
      description: 'Subcategory created successfully',
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
        <Button type='submit' disabled={isPending}>
          <Save />
        </Button>
      </form>
    </Form>
  )
}

export const AddSubcategoryForm = () => {
  const { data: profile } = useGetProfile()
  const { category } = useCurrentCategory()
  const { mutateAsync: createSubcategory, isPending } = useCreateSubcategory()
  const { toast } = useToast()

  if (!profile || !category) {
    return <div>Loading...</div>
  }

  return (
    <HookForm
      profile={profile}
      category={category}
      createSubcategory={createSubcategory}
      isPending={isPending}
      toast={toast}
    />
  )
}
