'use client'

import { useGetAllCategories } from '@/hooks/category/get-all-categories'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
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

export const CategoryCombobox = () => {
  const { data: allCategories } = useGetAllCategories()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')

  const headings = allCategories
    ?.filter((category) => category.parent_id === null)
    .map((category) => ({
      label: category.name,
      id: category.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const options = allCategories
    ?.filter((category) => category.parent_id !== null)
    .map((subcategory) => ({
      label: subcategory.name,
      color: subcategory.color,
      id: subcategory.id,
      parent_id: subcategory.parent_id,
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
                  options?.find((category) => category.id === selected)
                    ?.color as Color
                }
                size='sm'
                type='category'
              />
              {options?.find((category) => category.id === selected)?.label}
            </>
          ) : (
            'Select category...'
          )}{' '}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder='Search categories...' />
          <CommandList>
            <CommandEmpty>No categories found</CommandEmpty>
            {headings?.map((category) => (
              <CommandGroup key={category.label} heading={category.label}>
                {options
                  ?.filter(
                    (subcategory) => subcategory.parent_id === category.id
                  )
                  .map((subcategory) => (
                    <CommandItem
                      key={subcategory.label}
                      value={subcategory.label}
                      onSelect={() => {
                        setSelected(
                          subcategory.id === selected ? '' : subcategory.id
                        )
                        setOpen(false)
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
                          selected === subcategory.id
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
  )
}
