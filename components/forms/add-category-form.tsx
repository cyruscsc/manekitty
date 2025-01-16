'use client'

import { colors } from '@/config/colors'
import { CategoryCreate, Profile } from '@/lib/types/tables.types'
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
import { useCreateCategory } from '@/hooks/category/create-category'
import { useToast } from '@/hooks/ui/use-toast'
import { Save } from 'lucide-react'

const formSchema = z.object({
  userId: z.string(),
  parentId: z.null(),
  color: z.enum(Object.keys(colors) as unknown as [string, ...string[]]),
  name: z.string().min(2).max(16),
})

interface HookFormProps {
  profile: Profile
  createCategory: (data: CategoryCreate) => Promise<void>
  isPending: boolean
  toast: ReturnType<typeof useToast>['toast']
}

export const HookForm = ({
  profile,
  createCategory,
  isPending,
  toast,
}: HookFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: profile.id as string,
      parentId: null,
      color: '',
      name: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createCategory({
        user_id: data.userId,
        parent_id: data.parentId,
        color: data.color,
        name: data.name,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to create category',
      })
      console.error(error)
    }
    toast({
      description: 'Category created successfully',
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
        <Button type='submit' disabled={isPending}>
          <Save />
        </Button>
      </form>
    </Form>
  )
}

export const AddCategoryForm = () => {
  const { data: profile } = useGetProfile()
  const { mutateAsync: createCategory, isPending } = useCreateCategory()
  const { toast } = useToast()

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <HookForm
      profile={profile}
      createCategory={createCategory}
      isPending={isPending}
      toast={toast}
    />
  )
}
