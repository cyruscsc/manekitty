'use client'

import { currencies, themes } from '@/config/enums'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetProfile } from '@/hooks/profile/get-profile'
import { useUpdateProfile } from '@/hooks/profile/update-profile'
import { Currency, Theme } from '@/lib/types/enums.types'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const formSchema = z.object({
  displayName: z.string().min(2).max(16),
  theme: z.enum(themes as [string, ...string[]]),
  currency: z.enum(currencies as [string, ...string[]]),
})

export const ProfileForm = () => {
  const { data: profile, isFetching } = useGetProfile()
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: profile?.display_name ?? '',
      theme: profile?.theme,
      currency: profile?.currency,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateProfile({
        id: profile?.id as string,
        profile: {
          display_name: data.displayName,
          theme: data.theme as Theme,
          currency: data.currency as Currency,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return profile && !isFetching ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='displayName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder='Display name' {...field} />
              </FormControl>
              <FormDescription>2-16 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='theme'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a theme' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
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
          name='currency'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a currency' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency.charAt(0).toUpperCase() + currency.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  ) : (
    <div>Loading...</div>
  )
}
