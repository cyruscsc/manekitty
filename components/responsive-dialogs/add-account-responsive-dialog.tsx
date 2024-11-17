'use client'

import { useMediaQuery } from '@/hooks/ui/media-query'
import { useState } from 'react'
import { AddAccountDialog } from '../dialogs/add-account-dialog'
import { AddAccountDrawer } from '../drawers/add-account-drawer'
import { Button } from '../ui/button'

export const AddAccountResponsiveDialog = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const childProps = {
    open,
    setOpen,
    trigger: <Button>Add Account</Button>,
  }

  return isDesktop ? (
    <AddAccountDialog {...childProps} />
  ) : (
    <AddAccountDrawer {...childProps} />
  )
}
