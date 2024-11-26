import { accountTypes } from '@/config/enums'
import { AccountType } from '@/lib/types/enums.types'
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
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import { AccountUpdate, Profile } from '@/lib/types/tables.types'
import { colors } from '@/config/colors'
import { useCurrentAccount } from '@/hooks/account/current-account'
import { useUpdateAccount } from '@/hooks/account/update-account'
import { useGetProfile } from '@/hooks/profile/get-profile'

const formSchema = z.object({
  userId: z.string(),
  color: z.enum(Object.keys(colors) as unknown as [string, ...string[]]),
  name: z.string().min(2).max(16),
  type: z.enum(accountTypes as [string, ...string[]]),
  includeInNetWorth: z.boolean(),
})

interface HookFormProps {
  profile: Profile
  updateAccount: (params: {
    id: string
    account: AccountUpdate
  }) => Promise<void>
  isPending: boolean
}

export const HookForm = ({
  profile,
  updateAccount,
  isPending,
}: HookFormProps) => {
  const { account } = useCurrentAccount()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: profile.id as string,
      color: account.color,
      name: account.name,
      type: account.type,
      includeInNetWorth: account.include_in_net_worth,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateAccount({
        id: account.id,
        account: {
          user_id: data.userId,
          color: data.color,
          name: data.name,
          type: data.type as AccountType,
          include_in_net_worth: data.includeInNetWorth,
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
                <Input placeholder='Account name' {...field} />
              </FormControl>
              <FormDescription>2-16 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        <FormField
          control={form.control}
          name='includeInNetWorth'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Include in net worth</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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

export const EditAccountForm = () => {
  const { data: profile } = useGetProfile()
  const { mutateAsync: updateAccount, isPending } = useUpdateAccount()

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <HookForm
      profile={profile}
      updateAccount={updateAccount}
      isPending={isPending}
    />
  )
}
