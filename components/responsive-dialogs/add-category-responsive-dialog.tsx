'use client'

import { useMediaQuery } from '@/hooks/ui/media-query'
import { useState } from 'react'
import { Button } from '../ui/button'
import { AddCategoryDialog } from '../dialogs/add-category-dialog'
import { AddCategoryDrawer } from '../drawers/add-category-drawer'

export const AddCategoryResponsiveDialog = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const childProps = {
    open,
    setOpen,
    trigger: <Button>Add category</Button>,
  }

  return isDesktop ? (
    <AddCategoryDialog {...childProps} />
  ) : (
    <AddCategoryDrawer {...childProps} />
  )
}
