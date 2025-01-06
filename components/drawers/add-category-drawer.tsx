import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { AddCategoryForm } from '../forms/add-category-form'

interface AddCategoryDrawerProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger: ReactNode
}

export const AddCategoryDrawer = ({
  open,
  setOpen,
  trigger,
}: AddCategoryDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Add category</DrawerTitle>
        </DrawerHeader>
        <AddCategoryForm />
      </DrawerContent>
    </Drawer>
  )
}
