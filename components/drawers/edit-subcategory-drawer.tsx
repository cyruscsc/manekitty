import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'

interface EditSubcategoryDrawerProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger: ReactNode
}

export const EditSubcategoryDrawer = ({
  open,
  setOpen,
  trigger,
}: EditSubcategoryDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Edit Subcategory</DrawerTitle>
        </DrawerHeader>
        {/* <EditSubcategoryForm /> */}
      </DrawerContent>
    </Drawer>
  )
}
