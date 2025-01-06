import { colors } from '@/config/colors'
import { useCurrentCategory } from '@/hooks/category/current-category'
import { CategoryUpdate, Profile } from '@/lib/types/tables.types'
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

const formSchema = z.object({
  userId: z.string(),
  parentId: z.null(),
  color: z.enum(Object.keys(colors) as unknown as [string, ...string[]]),
  name: z.string().min(2).max(16),
})

interface HookFormProps {
  profile: Profile
  updateCategory: (params: {
    id: string
    category: CategoryUpdate
  }) => Promise<void>
  isPending: boolean
}

export const HookForm = ({
  profile,
  updateCategory,
  isPending,
}: HookFormProps) => {
  const { category } = useCurrentCategory()
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
      console.error(error)
    }
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
          Save
        </Button>
      </form>
    </Form>
  )
}

export const EditCategoryForm = () => {
  const { data: profile } = useGetProfile()
  const { mutateAsync: updateCategory, isPending } = useUpdateCategory()

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <HookForm
      profile={profile}
      updateCategory={updateCategory}
      isPending={isPending}
    />
  )
}