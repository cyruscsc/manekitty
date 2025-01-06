import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { EditCategoryForm } from '../forms/edit-category-form'

interface EditCategoryDrawerProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger: ReactNode
}

export const EditCategoryDrawer = ({
  open,
  setOpen,
  trigger,
}: EditCategoryDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Edit category</DrawerTitle>
        </DrawerHeader>
        <EditCategoryForm />
      </DrawerContent>
    </Drawer>
  )
}
