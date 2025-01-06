'use client'

import { useMediaQuery } from "@/hooks/ui/media-query"
import { PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Button } from "../ui/button"
import { AddSubcategoryDialog } from "../dialogs/add-subcategory-dialog"
import { AddSubcategoryDrawer } from "../drawers/add-subcategory-drawer"

export const AddSubcategoryResponsiveDialog = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const childProps = {
    open,
    setOpen,
    trigger: <Button><PlusIcon /></Button>,
  }

  return isDesktop ? (
    <AddSubcategoryDialog {...childProps} />
  ) : (
    <AddSubcategoryDrawer {...childProps} />
  )
}
