'use client'

import { transactionTypes } from '@/config/enums'
import { Color, TransactionType } from '@/lib/types/enums.types'
import { Profile, TransactionUpdate } from '@/lib/types/tables.types'
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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon, CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { ColorDot } from '../basics/color-dot'
import { useGetAccounts } from '@/hooks/account/get-accounts'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { useGetAllCategories } from '@/hooks/category/get-all-categories'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { useState } from 'react'
import { useCurrentTransaction } from '@/hooks/transaction/current-transaction'
import { useUpdateTransaction } from '@/hooks/transaction/update-transaction'
import { colors } from '@/config/colors'

const formSchema = z.object({
  userId: z.string(),
  accountId: z.string(),
  categoryId: z.string(),
  type: z.enum(transactionTypes as [string, ...string[]]),
  amount: z.coerce.number(),
  note: z.string().max(80).optional(),
  date: z.date(),
})

interface HookFormProps {
  profile: Profile
  updateTransaction: (params: {
    id: string
    transaction: TransactionUpdate
  }) => Promise<void>
  isPending: boolean
}

export const HookForm = ({
  profile,
  updateTransaction,
  isPending,
}: HookFormProps) => {
  const { transaction } = useCurrentTransaction()

  const accounts = useGetAccounts()
    .data?.map((account) => ({
      label: account.name,
      color: account.color,
      id: account.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const { data: allCategories } = useGetAllCategories()
  const categories = allCategories
    ?.filter((category) => category.parent_id === null)
    .map((category) => ({
      label: category.name,
      id: category.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
  const subcategories = allCategories
    ?.filter((category) => category.parent_id !== null)
    .map((subcategory) => ({
      label: subcategory.name,
      color: subcategory.color,
      id: subcategory.id,
      parent_id: subcategory.parent_id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: profile.id as string,
      accountId: transaction.account_id,
      categoryId: transaction.category_id,
      type: transaction.type,
      amount: transaction.amount,
      note: transaction.note || '',
      date: new Date(transaction.date),
    },
  })

  const [accountOpen, setAccountOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateTransaction({
        id: transaction.id,
        transaction: {
          user_id: data.userId,
          account_id: data.accountId,
          category_id: data.categoryId,
          type: data.type as TransactionType,
          amount: data.amount,
          note: data.note,
          date: data.date.toISOString().split('T')[0],
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (!accounts || !categories || !subcategories) {
    return <div>Loading...</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='accountId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <Popover modal open={accountOpen} onOpenChange={setAccountOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className={`${!field.value && 'text-muted-foreground'}`}
                    >
                      {field.value ? (
                        <>
                          <ColorDot
                            color={
                              accounts?.find(
                                (account) => account.id === field.value
                              )?.color as Color
                            }
                            size='sm'
                            type='account'
                          />{' '}
                          {
                            accounts?.find(
                              (account) => account.id === field.value
                            )?.label
                          }
                        </>
                      ) : (
                        'Select account'
                      )}{' '}
                      <ChevronDownIcon />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder='Search account...' />
                    <CommandList>
                      <CommandEmpty>No account found</CommandEmpty>
                      <CommandGroup>
                        {accounts?.map((account) => (
                          <CommandItem
                            key={account.label}
                            value={account.label}
                            onSelect={() => {
                              form.setValue('accountId', account.id)
                              setAccountOpen(false)
                            }}
                          >
                            <ColorDot
                              color={account.color as Color}
                              size='sm'
                              type='account'
                            />
                            {account.label}
                            <CheckIcon
                              className={cn(
                                'ml-auto',
                                field.value === account.id
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='categoryId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Popover modal open={categoryOpen} onOpenChange={setCategoryOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className={`${!field.value && 'text-muted-foreground'}`}
                    >
                      {field.value ? (
                        <>
                          <ColorDot
                            color={
                              subcategories?.find(
                                (subcategory) => subcategory.id === field.value
                              )?.color as Color
                            }
                            size='sm'
                            type='account'
                          />{' '}
                          {
                            subcategories?.find(
                              (subcategory) => subcategory.id === field.value
                            )?.label
                          }
                        </>
                      ) : (
                        'Select category'
                      )}{' '}
                      <ChevronDownIcon />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder='Search category...' />
                    <CommandList>
                      <CommandEmpty>No category found</CommandEmpty>

                      {categories?.map((category) => (
                        <CommandGroup
                          key={category.label}
                          heading={category.label}
                        >
                          {subcategories
                            ?.filter(
                              (subcategory) =>
                                subcategory.parent_id === category.id
                            )
                            .map((subcategory) => (
                              <CommandItem
                                key={subcategory.label}
                                value={subcategory.label}
                                onSelect={() => {
                                  form.setValue('categoryId', subcategory.id)
                                  setCategoryOpen(false)
                                }}
                              >
                                <ColorDot
                                  color={subcategory.color as Color}
                                  size='sm'
                                  type='category'
                                />
                                {subcategory.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto',
                                    field.value === subcategory.id
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
                  {transactionTypes.map((type) => (
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
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder='0' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='note'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input placeholder='Note' {...field} />
              </FormControl>
              <FormDescription>Max 80 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover modal open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className={`${!field.value && 'text-muted-foreground'}`}
                    >
                      {field.value ? format(field.value, 'PP') : 'Pick a date'}{' '}
                      <CalendarIcon />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={(value) => {
                      field.onChange(value)
                      setDateOpen(false)
                    }}
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
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

export const EditTransactionForm = () => {
  const { data: profile } = useGetProfile()
  const { mutateAsync: updateTransaction, isPending } = useUpdateTransaction()

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <HookForm
      profile={profile}
      updateTransaction={updateTransaction}
      isPending={isPending}
    />
  )
}
