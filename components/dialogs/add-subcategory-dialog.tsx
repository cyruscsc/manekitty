import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { AddSubcategoryForm } from '../forms/add-subcategory-form'

interface AddSubcategoryDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  trigger: ReactNode
}

export const AddSubcategoryDialog = ({
  open,
  setOpen,
  trigger,
}: AddSubcategoryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add subcategory</DialogTitle>
        </DialogHeader>
        <AddSubcategoryForm />
      </DialogContent>
    </Dialog>
  )
}
