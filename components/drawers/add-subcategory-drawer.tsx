import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { AddSubcategoryForm } from '../forms/add-subcategory-form'

interface AddSubcategoryDrawerProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger: ReactNode
}

export const AddSubcategoryDrawer = ({
  open,
  setOpen,
  trigger,
}: AddSubcategoryDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Add subcategory</DrawerTitle>
        </DrawerHeader>
        <AddSubcategoryForm />
      </DrawerContent>
    </Drawer>
  )
}
