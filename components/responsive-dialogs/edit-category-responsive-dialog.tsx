'use client'

import { useMediaQuery } from "@/hooks/ui/media-query"
import { useState } from "react"
import { Button } from "../ui/button"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { EditCategoryDialog } from "../dialogs/edit-category-dialog"
import { EditCategoryDrawer } from "../drawers/edit-category-drawer"

export const EditCategoryResponsiveDialog = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const childProps = {
    open,
    setOpen,
    trigger: <Button variant='secondary'><Pencil1Icon /></Button>,
  }

  return isDesktop ? (
    <EditCategoryDialog {...childProps} />
  ) : (
    <EditCategoryDrawer {...childProps} />
  )
}
