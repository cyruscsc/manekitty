'use client'

import { Color } from '@/lib/types/enums.types'
import {
  Account,
  Category,
  Profile,
  Subcategory,
  Transaction,
  TransactionUpdate,
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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarSearch, Check, ChevronsUpDown, Save } from 'lucide-react'
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
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { useState } from 'react'
import { useCurrentTransaction } from '@/hooks/transaction/current-transaction'
import { useUpdateTransaction } from '@/hooks/transaction/update-transaction'
import { useToast } from '@/hooks/ui/use-toast'
import { useDeleteTransaction } from '@/hooks/transaction/delete-transaction'
import { DeleteModal } from '../modals/delete-modal'

const formSchema = z.object({
  userId: z.string(),
  fromAccountId: z.string(),
  categoryId: z.string(),
  amount: z.coerce.number(),
  note: z.string().max(80).optional(),
  date: z.date(),
})

interface HookFormProps {
  profile: Profile
  transaction: Transaction
  accounts: Account[]
  categories: Category[]
  subcategories: Subcategory[]
  updateTransaction: (params: {
    id: string
    transaction: TransactionUpdate
  }) => Promise<void>
  isPendingUpdate: boolean
  deleteTransaction: (id: string) => Promise<void>
  isPendingDelete: boolean
  toast: ReturnType<typeof useToast>['toast']
}

export const HookForm = ({
  profile,
  transaction,
  accounts,
  categories,
  subcategories,
  updateTransaction,
  isPendingUpdate,
  deleteTransaction,
  isPendingDelete,
  toast,
}: HookFormProps) => {
  const accountOpts = accounts
    .map((account) => ({
      label: account.name,
      color: account.color,
      id: account.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const categoryOpts = categories
    .map((category) => ({
      label: category.name,
      id: category.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const subcategoryOpts = subcategories
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
      fromAccountId: transaction.from_account_id,
      categoryId: transaction.category_id,
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
          from_account_id: data.fromAccountId,
          category_id: data.categoryId,
          amount: data.amount,
          note: data.note,
          date: data.date.toISOString().split('T')[0],
        },
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to update transaction',
      })
      console.error(error)
    }
    toast({
      description: 'Transaction updated successfully',
    })
  }

  const onDelete = async () => {
    try {
      await deleteTransaction(transaction.id)
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to delete transaction',
      })
      console.error(error)
    }
    toast({
      description: 'Transaction deleted successfully',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='fromAccountId'
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
                              accountOpts?.find(
                                (account) => account.id === field.value
                              )?.color as Color
                            }
                            size='sm'
                            type='account'
                          />{' '}
                          {
                            accountOpts?.find(
                              (account) => account.id === field.value
                            )?.label
                          }
                        </>
                      ) : (
                        'Select account'
                      )}{' '}
                      <ChevronsUpDown />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder='Search account...' />
                    <CommandList>
                      <CommandEmpty>No account found</CommandEmpty>
                      <CommandGroup>
                        {accountOpts?.map((account) => (
                          <CommandItem
                            key={account.label}
                            value={account.label}
                            onSelect={() => {
                              form.setValue('fromAccountId', account.id)
                              setAccountOpen(false)
                            }}
                          >
                            <ColorDot
                              color={account.color as Color}
                              size='sm'
                              type='account'
                            />
                            {account.label}
                            <Check
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
              <FormMessage />
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
                              subcategoryOpts?.find(
                                (subcategory) => subcategory.id === field.value
                              )?.color as Color
                            }
                            size='sm'
                            type='account'
                          />{' '}
                          {
                            subcategoryOpts?.find(
                              (subcategory) => subcategory.id === field.value
                            )?.label
                          }
                        </>
                      ) : (
                        'Select category'
                      )}{' '}
                      <ChevronsUpDown />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder='Search category...' />
                    <CommandList>
                      <CommandEmpty>No category found</CommandEmpty>

                      {categoryOpts?.map((category) => (
                        <CommandGroup
                          key={category.label}
                          heading={category.label}
                        >
                          {subcategoryOpts
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
                                <Check
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
                      <CalendarSearch />
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
            title={`Are you sure to delete ${
              transaction.note || 'this transaction'
            }?`}
            description={`This action cannot be undone. This will permanently delete ${
              transaction.note || 'this transaction'
            }.`}
            onDelete={onDelete}
            isPending={isPendingDelete}
          />
        </div>
      </form>
    </Form>
  )
}

export const EditTransactionForm = () => {
  const { data: profile } = useGetProfile()
  const { transaction } = useCurrentTransaction()
  const { data: accounts } = useGetAccounts()
  const { data: allCategories } = useGetAllCategories()
  const { mutateAsync: updateTransaction, isPending: isPendingUpdate } =
    useUpdateTransaction()
  const { mutateAsync: deleteTransaction, isPending: isPendingDelete } =
    useDeleteTransaction()
  const { toast } = useToast()

  if (!profile || !transaction || !accounts || !allCategories) {
    return <div>Loading...</div>
  }

  const categories = allCategories.filter(
    (category) => !category.parent_id
  ) as Category[]

  const subcategories = allCategories.filter(
    (category) => category.parent_id
  ) as Subcategory[]

  return (
    <HookForm
      profile={profile}
      transaction={transaction}
      accounts={accounts}
      categories={categories}
      subcategories={subcategories}
      updateTransaction={updateTransaction}
      isPendingUpdate={isPendingUpdate}
      deleteTransaction={deleteTransaction}
      isPendingDelete={isPendingDelete}
      toast={toast}
    />
  )
}
