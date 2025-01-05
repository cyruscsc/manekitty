import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { EditAccountForm } from '../forms/edit-account-form'

interface EditAccountDrawerProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger: ReactNode
}

export const EditAccountDrawer = ({
  open,
  setOpen,
  trigger,
}: EditAccountDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Edit account</DrawerTitle>
        </DrawerHeader>
        <EditAccountForm />
      </DrawerContent>
    </Drawer>
  )
}
