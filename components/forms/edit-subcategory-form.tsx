import { colors } from '@/config/colors'
import { useCurrentSubcategory } from '@/hooks/category/current-subcategory'
import { Profile, SubcategoryUpdate } from '@/lib/types/tables.types'
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

const formSchema = z.object({
  userId: z.string(),
  parentId: z.string(),
  color: z.enum(Object.keys(colors) as unknown as [string, ...string[]]),
  name: z.string().min(2).max(16),
})

interface HookFormProps {
  profile: Profile
  updateSubcategory: (params: {
    id: string
    subcategory: SubcategoryUpdate
  }) => Promise<void>
  isPending: boolean
}

export const HookForm = ({
  profile,
  updateSubcategory,
  isPending,
}: HookFormProps) => {
  const { subcategory } = useCurrentSubcategory()
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
                <Input placeholder='Subcategory name' {...field} />
              </FormControl>
              <FormDescription>2-16 characters</FormDescription>
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

export const EditSubcategoryForm = () => {
  const { data: profile } = useGetProfile()
  const { mutateAsync: updateSubcategory, isPending } = useUpdateSubcategory()

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <HookForm
      profile={profile}
      updateSubcategory={updateSubcategory}
      isPending={isPending}
    />
  )
}