'use client'

import { useMediaQuery } from '@/hooks/ui/media-query'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'

interface FormDialogDrawerProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title: string
  trigger: ReactNode
  form: ReactNode
}

interface FormModalProps {
  title: string
  trigger: ReactNode
  form: ReactNode
}

export const FormDialog = ({
  open,
  setOpen,
  title,
  trigger,
  form,
}: FormDialogDrawerProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  )
}

export const FormDrawer = ({
  open,
  setOpen,
  title,
  trigger,
  form,
}: FormDialogDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {form}
      </DrawerContent>
    </Drawer>
  )
}

export const FormModal = (props: FormModalProps) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return isDesktop ? (
    <FormDialog {...props} open={open} setOpen={setOpen} />
  ) : (
    <FormDrawer {...props} open={open} setOpen={setOpen} />
  )
}
