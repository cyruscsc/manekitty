'use client'

import { useGetAccounts } from '@/hooks/account/get-accounts'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { cn } from '@/lib/utils'
import { ColorDot } from '../basics/color-dot'
import { Color } from '@/lib/types/enums.types'

export const AccountCombobox = () => {
  const { data: accounts } = useGetAccounts()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')

  const options = accounts
    ?.map((account) => ({
      label: account.name,
      color: account.color,
      id: account.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          {selected ? (
            <>
              <ColorDot
                color={
                  options?.find((account) => account.id === selected)
                    ?.color as Color
                }
                size='sm'
                type='account'
              />{' '}
              {options?.find((account) => account.id === selected)?.label}
            </>
          ) : (
            'Select account...'
          )}{' '}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder='Search accounts...' />
          <CommandList>
            <CommandEmpty>No accounts found</CommandEmpty>
            <CommandGroup>
              {options?.map((account) => (
                <CommandItem
                  key={account.label}
                  value={account.label}
                  onSelect={() => {
                    setSelected(account.id === selected ? '' : account.id)
                    setOpen(false)
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
                      selected === account.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
