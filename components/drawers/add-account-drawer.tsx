import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { Button } from '../ui/button'

interface AddAccountDrawerProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger: ReactNode
}

export const AddAccountDrawer = ({
  open,
  setOpen,
  trigger,
}: AddAccountDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Add account</DrawerTitle>
          <DrawerDescription>
            Add a account to record transactions.
          </DrawerDescription>
        </DrawerHeader>
        <div className='px-4'>Form goes here</div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
