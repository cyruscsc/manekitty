'use client'

import { useMediaQuery } from '@/hooks/ui/media-query'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { EditAccountDialog } from '../dialogs/edit-account-dialog'
import { EditAccountDrawer } from '../drawers/edit-account.drawer'

export const EditAccountResponsiveDialog = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const childProps = {
    open,
    setOpen,
    trigger: <Button variant='secondary'><Pencil1Icon /></Button>,
  }

  return isDesktop ? (
    <EditAccountDialog {...childProps} />
  ) : (
    <EditAccountDrawer {...childProps} />
  )
}
